import { BOOKING_API_URL, R2_BASE_URL } from "@/config";
const R2_PDF_URL = R2_BASE_URL + "/pdfs";

export async function sendGhidulSaturnEmail(to: string) {
  try {
    const response = await fetch(
      `${BOOKING_API_URL}/send-email-with-attachments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject: "Ghidul lui Saturn în Berbec",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a1a; color: #f3e8ff;">
            <h1 style="color: #a855f7;">Bine ai venit!</h1>
            <p>Eu sunt <strong>Ghidul lui Saturn în Berbec</strong> - ghidul tău personal pentru această perioadă intensă.</p>
            <p>În attachment vei găsi PDF-ul cu toate informațiile despre cum să navighezi energiile lui Saturn în semnul Berbecului.</p>
            <p style="margin-top: 30px;">Cu drag,<br>Echipa AstroLumina</p>
          </div>
        `,
          attachments: [`${R2_PDF_URL}/Ghidul-lui-Saturn-in-Berbec.pdf`],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Email API error:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendSoareleStralucireaEmail(to: string, sunSign: string) {
  try {
    const attachmentFileName = `${sunSign}, Stralucirea Ta.pdf`;

    const response = await fetch(
      `${BOOKING_API_URL}/send-email-with-attachments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to,
          subject: "Soarele, Strălucirea Ta",
          html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: #0a0a1a; color: #f3e8ff;">
            <h1 style="color: #fbbf24;">Soarele, Strălucirea Ta</h1>
            <p>Felicitări! Ai primit cadoul gratuit de la AstroLumina.</p>
            <p>Zodia Soarelui tău este <strong>${sunSign}</strong> - în attachment PDF-ul cu toate detaliile.</p>
            <p>În curând vei primi și mai multe informații despre tine.</p>
            <p style="margin-top: 30px;">Cu drag,<br>Echipa AstroLumina</p>
          </div>
        `,
          attachments: [`${R2_PDF_URL}/${attachmentFileName}`],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Email API error:", data);
      return { success: false, error: data };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}
