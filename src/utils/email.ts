const BOOKING_API_URL = import.meta.env.VITE_BOOKING_API_URL;

export async function sendEmail(to: string, type: 'ghid-saturn' | 'soarele-stralucirea-ta') {
  try {
    const response = await fetch(`${BOOKING_API_URL}/send-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ to, type }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Email API error:", data);
      return { success: false, error: data };
    }

    console.log(`Email sent to ${to}:`, data);
    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
}

export async function sendGhidulSaturnEmail(to: string) {
  return sendEmail(to, 'ghid-saturn');
}

export async function sendSoareleStralucireaEmail(to: string) {
  return sendEmail(to, 'soarele-stralucirea-ta');
}