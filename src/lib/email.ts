const RESEND_API_KEY = process.env.RESEND_API_KEY;
const NOTIFICATION_EMAIL =
  process.env.NOTIFICATION_EMAIL || "valdovaldo1500@gmail.com";

export async function sendEmail(
  subject: string,
  html: string
): Promise<boolean> {
  if (!RESEND_API_KEY) {
    console.warn("[email] RESEND_API_KEY not set — skipping email");
    return false;
  }

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Imóveis Caixa RS <alerts@crimebrasil.com.br>",
        to: [NOTIFICATION_EMAIL],
        subject,
        html,
      }),
    });

    if (!res.ok) {
      const body = await res.text();
      console.error(`[email] Resend error ${res.status}: ${body}`);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[email] Failed to send email:", err);
    return false;
  }
}
