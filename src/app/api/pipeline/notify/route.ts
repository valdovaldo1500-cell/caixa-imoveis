import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { properties, priceHistory } from "@/lib/db/schema";
import { sendEmail } from "@/lib/email";
import { sql, desc, and, gte, lt, isNull, eq } from "drizzle-orm";

function formatBRL(value: string | null | undefined): string {
  if (!value) return "—";
  const n = parseFloat(value);
  return n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function formatDiscount(value: string | null | undefined): string {
  if (!value) return "—";
  return `${parseFloat(value).toFixed(1)}%`;
}

function formatScore(value: string | null | undefined): string {
  if (!value) return "—";
  return parseFloat(value).toFixed(0);
}

function highlightRow(score: string | null | undefined): string {
  if (!score) return "";
  return parseFloat(score) >= 75
    ? "background:#d1fae5;font-weight:bold;"
    : "";
}

function buildPropertyTable(
  rows: Array<{
    caixaId: string;
    cidade: string;
    bairro: string | null;
    tipoImovel: string | null;
    preco: string | null;
    desconto: string | null;
    score: string | null;
    linkCaixa: string | null;
  }>
): string {
  const tdStyle = "padding:6px 10px;border:1px solid #334155;";
  const rowsHtml = rows
    .map((p) => {
      const rowStyle = highlightRow(p.score);
      const link = p.linkCaixa
        ? `<a href="${p.linkCaixa}" style="color:#2563eb;">Ver</a>`
        : p.caixaId;
      return `<tr style="${rowStyle}">
        <td style="${tdStyle}">${p.cidade}</td>
        <td style="${tdStyle}">${p.bairro ?? "—"}</td>
        <td style="${tdStyle}">${p.tipoImovel ?? "—"}</td>
        <td style="${tdStyle}">${formatBRL(p.preco)}</td>
        <td style="${tdStyle}">${formatDiscount(p.desconto)}</td>
        <td style="${tdStyle}">${formatScore(p.score)}</td>
        <td style="${tdStyle}">${link}</td>
      </tr>`;
    })
    .join("\n");

  return `<table style="border-collapse:collapse;font-family:sans-serif;font-size:13px;width:100%;">
    <thead>
      <tr style="background:#1e293b;color:white;">
        <th style="${tdStyle}">Cidade</th>
        <th style="${tdStyle}">Bairro</th>
        <th style="${tdStyle}">Tipo</th>
        <th style="${tdStyle}">Preço</th>
        <th style="${tdStyle}">Desconto</th>
        <th style="${tdStyle}">Score</th>
        <th style="${tdStyle}">Link</th>
      </tr>
    </thead>
    <tbody>${rowsHtml}</tbody>
  </table>`;
}

export async function POST() {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Query new properties added today
    const newProps = await db
      .select({
        caixaId: properties.caixaId,
        cidade: properties.cidade,
        bairro: properties.bairro,
        tipoImovel: properties.tipoImovel,
        preco: properties.preco,
        desconto: properties.desconto,
        score: properties.score,
        linkCaixa: properties.linkCaixa,
      })
      .from(properties)
      .where(
        and(
          gte(properties.firstSeenAt, today),
          lt(properties.firstSeenAt, tomorrow),
          isNull(properties.removedAt)
        )
      )
      .orderBy(desc(sql`COALESCE(${properties.score}::numeric, 0)`))
      .limit(25);

    // Query price changes today (properties with price history recorded today,
    // excluding newly added ones)
    const priceChangedRows = await db.execute(sql`
      SELECT DISTINCT ON (p.caixa_id)
        p.caixa_id AS "caixaId",
        p.cidade,
        p.bairro,
        p.tipo_imovel AS "tipoImovel",
        p.preco,
        p.desconto,
        p.score,
        p.link_caixa AS "linkCaixa",
        ph.preco AS "oldPreco"
      FROM price_history ph
      JOIN properties p ON p.id = ph.property_id
      WHERE ph.recorded_at >= ${today}
        AND ph.recorded_at < ${tomorrow}
        AND p.first_seen_at < ${today}
        AND p.removed_at IS NULL
      ORDER BY p.caixa_id, ph.recorded_at DESC
    `);

    const priceChanges = (priceChangedRows as unknown) as Array<{
      caixaId: string;
      cidade: string;
      bairro: string | null;
      tipoImovel: string | null;
      preco: string | null;
      desconto: string | null;
      score: string | null;
      linkCaixa: string | null;
      oldPreco: string | null;
    }>;

    const newCount = newProps.length;
    const priceChangeCount = priceChanges.length;

    // If nothing to report, skip email
    if (newCount === 0 && priceChangeCount === 0) {
      return NextResponse.json({
        sent: false,
        newCount: 0,
        priceChanges: 0,
        reason: "Nenhuma novidade hoje",
      });
    }

    // Build email
    const dateStr = today.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

    const highScoreProps = newProps.filter(
      (p) => p.score && parseFloat(p.score) >= 75
    );

    let html = `<div style="font-family:sans-serif;max-width:900px;">
<h2 style="color:#1e293b;">Caixa Imóveis RS — Resumo ${dateStr}</h2>`;

    // High-score alert section
    if (highScoreProps.length > 0) {
      html += `<div style="background:#d1fae5;border:2px solid #059669;border-radius:6px;padding:12px;margin-bottom:16px;">
  <strong style="color:#065f46;">Oportunidades com Score ≥ 75:</strong><br/>`;
      for (const p of highScoreProps) {
        html += `&nbsp;&nbsp;• ${p.tipoImovel ?? "Imóvel"} em ${p.bairro ?? "—"}, ${p.cidade} — Score ${formatScore(p.score)}, Desconto ${formatDiscount(p.desconto)}, ${formatBRL(p.preco)}<br/>`;
      }
      html += `</div>`;
    }

    // New properties section
    if (newCount > 0) {
      const displayProps = newProps.slice(0, 20);
      const extra = newCount > 20 ? newCount - 20 : 0;
      html += `<h3 style="color:#1e293b;">${newCount} novo${newCount > 1 ? "s" : ""} imóvel${newCount > 1 ? "is" : ""} encontrado${newCount > 1 ? "s" : ""}</h3>`;
      html += buildPropertyTable(displayProps);
      if (extra > 0) {
        html += `<p style="color:#64748b;font-size:12px;">...e mais ${extra} imóveis não exibidos.</p>`;
      }
    }

    // Price changes section
    if (priceChangeCount > 0) {
      const displayChanges = priceChanges.slice(0, 20);
      const extra = priceChangeCount > 20 ? priceChangeCount - 20 : 0;
      html += `<h3 style="color:#1e293b;margin-top:24px;">${priceChangeCount} imóvel${priceChangeCount > 1 ? "is" : ""} com alteração de preço</h3>`;

      // Build a modified table with old price column
      const tdStyle = "padding:6px 10px;border:1px solid #334155;";
      const rowsHtml = displayChanges
        .map((p) => {
          const rowStyle = highlightRow(p.score);
          const link = p.linkCaixa
            ? `<a href="${p.linkCaixa}" style="color:#2563eb;">Ver</a>`
            : p.caixaId;
          return `<tr style="${rowStyle}">
            <td style="${tdStyle}">${p.cidade}</td>
            <td style="${tdStyle}">${p.bairro ?? "—"}</td>
            <td style="${tdStyle}">${p.tipoImovel ?? "—"}</td>
            <td style="${tdStyle}">${formatBRL(p.oldPreco)}</td>
            <td style="${tdStyle}">${formatBRL(p.preco)}</td>
            <td style="${tdStyle}">${formatDiscount(p.desconto)}</td>
            <td style="${tdStyle}">${formatScore(p.score)}</td>
            <td style="${tdStyle}">${link}</td>
          </tr>`;
        })
        .join("\n");

      html += `<table style="border-collapse:collapse;font-family:sans-serif;font-size:13px;width:100%;">
        <thead>
          <tr style="background:#1e293b;color:white;">
            <th style="${tdStyle}">Cidade</th>
            <th style="${tdStyle}">Bairro</th>
            <th style="${tdStyle}">Tipo</th>
            <th style="${tdStyle}">Preço Ant.</th>
            <th style="${tdStyle}">Preço Atual</th>
            <th style="${tdStyle}">Desconto</th>
            <th style="${tdStyle}">Score</th>
            <th style="${tdStyle}">Link</th>
          </tr>
        </thead>
        <tbody>${rowsHtml}</tbody>
      </table>`;
      if (extra > 0) {
        html += `<p style="color:#64748b;font-size:12px;">...e mais ${extra} alterações não exibidas.</p>`;
      }
    }

    html += `<p style="color:#94a3b8;font-size:11px;margin-top:24px;">Gerado automaticamente — imoveis.crimebrasil.com.br</p></div>`;

    const subjectParts: string[] = [];
    if (newCount > 0)
      subjectParts.push(`${newCount} novo${newCount > 1 ? "s" : ""}`);
    if (priceChangeCount > 0)
      subjectParts.push(`${priceChangeCount} preço${priceChangeCount > 1 ? "s" : ""} alterado${priceChangeCount > 1 ? "s" : ""}`);
    const subject = `Caixa Imóveis RS — ${subjectParts.join(", ")} — ${dateStr}`;

    const sent = await sendEmail(subject, html);

    return NextResponse.json({
      sent,
      newCount,
      priceChanges: priceChangeCount,
    });
  } catch (err) {
    console.error("[notify] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
