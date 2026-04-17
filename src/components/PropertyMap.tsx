"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";

interface MapProperty {
  id: number;
  cidade: string;
  bairro: string | null;
  preco: string | null;
  valorAvaliacao: string | null;
  desconto: string | null;
  tipoImovel: string | null;
  quartos: number | null;
  vagas: number | null;
  areaPrivativaM2: string | null;
  score: string | null;
  marketValue: string | null;
  modalidadeVenda: string | null;
  linkCaixa: string | null;
  fotoUrl: string | null;
  lat: string;
  lng: string;
}

const STATE_CENTERS: Record<string, [number, number]> = {
  RS: [-29.95, -51.15],
  GO: [-16.69, -49.26],
};

interface PropertyMapProps {
  properties: MapProperty[];
  state?: string;
}

function getMarkerColor(desconto: string | null): string {
  if (!desconto) return "#ef4444"; // red
  const d = parseFloat(desconto);
  if (d >= 50) return "#22c55e"; // green
  if (d >= 30) return "#eab308"; // yellow
  return "#ef4444"; // red
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createClusterIcon(cluster: any): L.DivIcon {
  const count = cluster.getChildCount();
  let size = 36;
  let bg = "rgba(34,197,94,0.85)";
  if (count > 50) { size = 48; bg = "rgba(239,68,68,0.85)"; }
  else if (count > 20) { size = 44; bg = "rgba(234,179,8,0.85)"; }
  else if (count > 5) { size = 40; bg = "rgba(34,197,94,0.85)"; }

  return L.divIcon({
    html: `<div style="
      width:${size}px;height:${size}px;
      display:flex;align-items:center;justify-content:center;
      border-radius:50%;
      background:${bg};
      color:white;font-weight:700;font-size:13px;
      border:3px solid rgba(255,255,255,0.5);
      box-shadow:0 2px 8px rgba(0,0,0,0.4);
    ">${count}</div>`,
    className: "",
    iconSize: L.point(size, size),
    iconAnchor: L.point(size / 2, size / 2),
  });
}

function formatBRL(value: string | null): string {
  if (!value) return "—";
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(Number(value));
}

export default function PropertyMap({ properties, state }: PropertyMapProps) {
  const center = STATE_CENTERS[(state || "RS").toUpperCase()] ?? STATE_CENTERS.RS;
  return (
    <MapContainer
      center={center}
      zoom={7}
      style={{ width: "100%", height: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        iconCreateFunction={createClusterIcon}
        showCoverageOnHover={false}
        maxClusterRadius={40}
        spiderfyOnMaxZoom
        spiderfyDistanceMultiplier={2}
        zoomToBoundsOnClick
      >
        {properties.map((p) => {
          const color = getMarkerColor(p.desconto);
          const lat = parseFloat(p.lat);
          const lng = parseFloat(p.lng);
          if (isNaN(lat) || isNaN(lng)) return null;
          return (
            <CircleMarker
              key={p.id}
              center={[lat, lng]}
              radius={7}
              pathOptions={{
                fillColor: color,
                fillOpacity: 0.9,
                color: "rgba(0,0,0,0.5)",
                weight: 2,
              }}
            >
              <Popup>
                <div style={{ minWidth: 240, fontSize: 13, lineHeight: 1.5 }}>
                  {p.fotoUrl && (
                    <img src={p.fotoUrl} alt="" style={{ width: "100%", height: 80, objectFit: "cover", borderRadius: 4, marginBottom: 6 }} />
                  )}
                  <p style={{ fontWeight: "bold", marginBottom: 2, fontSize: 14 }}>
                    {p.tipoImovel || "Imóvel"} — {p.bairro || p.cidade}
                  </p>
                  <p style={{ color: "#888", fontSize: 11, marginBottom: 6 }}>
                    {p.cidade}{p.areaPrivativaM2 ? ` · ${parseFloat(p.areaPrivativaM2).toFixed(0)}m²` : ""}
                    {p.quartos ? ` · ${p.quartos}q` : ""}
                    {p.vagas ? ` · ${p.vagas}v` : ""}
                  </p>
                  <table style={{ width: "100%", fontSize: 12, borderCollapse: "collapse" }}>
                    <tbody>
                      <tr>
                        <td style={{ color: "#888", paddingRight: 8 }}>Preço</td>
                        <td style={{ fontWeight: 600 }}>{formatBRL(p.preco)}</td>
                      </tr>
                      {p.desconto && (
                        <tr>
                          <td style={{ color: "#888" }}>Desconto</td>
                          <td style={{ fontWeight: 600, color }}>{parseFloat(p.desconto).toFixed(0)}%</td>
                        </tr>
                      )}
                      {p.marketValue && (
                        <tr>
                          <td style={{ color: "#888" }}>Mercado</td>
                          <td>{formatBRL(p.marketValue)}</td>
                        </tr>
                      )}
                      {p.score && (
                        <tr>
                          <td style={{ color: "#888" }}>Score</td>
                          <td style={{ fontWeight: 600 }}>{parseFloat(p.score).toFixed(0)}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                  <p style={{ color: "#888", fontSize: 11, marginTop: 4 }}>
                    {p.modalidadeVenda || ""}
                  </p>
                  <div style={{ marginTop: 6, display: "flex", gap: 8 }}>
                    <a href={`/imoveis/${p.id}`} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", fontSize: 12 }}>
                      Detalhes →
                    </a>
                    {p.linkCaixa && (
                      <a href={p.linkCaixa} target="_blank" rel="noopener noreferrer" style={{ color: "#888", fontSize: 12 }}>
                        Caixa →
                      </a>
                    )}
                  </div>
                </div>
              </Popup>
            </CircleMarker>
          );
        })}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
