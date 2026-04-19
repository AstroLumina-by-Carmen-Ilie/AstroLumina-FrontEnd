import { Resend } from "resend";

const RESEND_API_KEY = import.meta.env.VITE_RESEND_API_KEY;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const FROM_EMAIL = "AstroLumina <carmen.ilie@astrolumina.ro>";

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail({ to, subject, html, text }: SendEmailParams) {
  if (!resend) {
    console.error("Resend not configured - email not sent");
    return { success: false, error: "Resend not configured" };
  }

  try {
    const data = await resend.emails.send({
      from: FROM_EMAIL,
      to,
      subject,
      html,
      text: text || html.replace(/<[^>]*>/g, ""),
    });

    console.log(`Email sent to ${to}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendGhidulSaturnEmail(to: string) {
  const subject = "Ghidul lui Saturn în Berbec | Download";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a1a; color: #f3e8ff;">
      <h1 style="color: #a855f7;">Bine ai venit!</h1>
      <p>Eu sunt <strong>Ghidul lui Saturn în Berbec</strong> - ghidul tău personal pentru această perioadă intensă.</p>
      <p>Vei primi curând PDF-ul cu toate informațiile despre cum să navighezi energiile lui Saturn în semnul Berbecului.</p>
      <p style="margin-top: 30px;">Cu drag,<br>Echipa AstroLumina</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
}

export async function sendSoareleStralucireaEmail(to: string) {
  const subject = "Soarele, Strălucirea Ta | Cadoul tău";
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a1a; color: #f3e8ff;">
      <h1 style="color: #fbbf24;">Soarele, Strălucirea Ta</h1>
      <p>Felicitări! Ai primit cadoul gratuit de la AstroLumina.</p>
      <p>Acest mesaj conține informațiile despre tine - zodia Soarelui tău.</p>
      <p>În curând vei primi și PDF-ul cu detalii complete.</p>
      <p style="margin-top: 30px;">Cu drag,<br>Echipa AstroLumina</p>
    </div>
  `;

  return sendEmail({ to, subject, html });
}
