import { siteConfig } from "@/lib/site";

export interface InquiryEmailData {
  name: string;
  phone: string;
  email: string;
  message: string;
  source: string;
  pagePath: string;
  locale: string;
}

export interface EmailResult {
  sent: boolean;
  skipped?: boolean;
  error?: string;
}

function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function lines(data: InquiryEmailData): string[] {
  return [
    "New Homix website inquiry",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone || "-"}`,
    `Source: ${data.source || "website"}`,
    `Page: ${data.pagePath || "-"}`,
    `Language: ${data.locale || "-"}`,
    "",
    "Message:",
    data.message || "-",
  ];
}

function htmlBody(data: InquiryEmailData): string {
  const rows = [
    ["Name", data.name],
    ["Email", data.email],
    ["Phone", data.phone || "-"],
    ["Source", data.source || "website"],
    ["Page", data.pagePath || "-"],
    ["Language", data.locale || "-"],
  ];

  return `
    <div style="font-family: Inter, Arial, sans-serif; color: #1C1B18; line-height: 1.55;">
      <h1 style="font-family: Georgia, serif; font-weight: 400; margin: 0 0 20px;">New Homix inquiry</h1>
      <table cellpadding="0" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 640px;">
        ${rows
          .map(
            ([label, value]) => `
              <tr>
                <td style="border-top: 1px solid #E6E1D7; padding: 10px 14px 10px 0; color: #75716A; width: 120px;">${escapeHtml(label)}</td>
                <td style="border-top: 1px solid #E6E1D7; padding: 10px 0;">${escapeHtml(value)}</td>
              </tr>
            `,
          )
          .join("")}
      </table>
      <div style="margin-top: 24px;">
        <p style="margin: 0 0 8px; color: #75716A;">Message</p>
        <div style="white-space: pre-wrap; border: 1px solid #E6E1D7; background: #FCFAF5; padding: 16px;">${escapeHtml(
          data.message || "-",
        )}</div>
      </div>
    </div>
  `;
}

export async function sendInquiryEmail(data: InquiryEmailData): Promise<EmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { sent: false, skipped: true, error: "RESEND_API_KEY not configured" };

  const to = process.env.INQUIRY_TO_EMAIL || siteConfig.contact.email;
  const from =
    process.env.INQUIRY_FROM_EMAIL || `Homix Website <inquiries@${new URL(siteConfig.url).hostname.replace(/^www\./, "")}>`;
  const bcc = (process.env.INQUIRY_BCC_EMAIL || "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        ...(bcc.length ? { bcc } : {}),
        reply_to: data.email,
        subject: `New Homix inquiry from ${data.name}`,
        text: lines(data).join("\n"),
        html: htmlBody(data),
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      return { sent: false, error: `Resend ${res.status}: ${text.slice(0, 300)}` };
    }

    return { sent: true };
  } catch (err) {
    return {
      sent: false,
      error: err instanceof Error ? err.message : "Unknown email error",
    };
  }
}
