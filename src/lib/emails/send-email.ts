// lib/sendEmail.ts
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function sendEmail({
  to,
  subject,
  html,
  text,
}: {
  to: string;
  subject: string;
  html: string;
  text: string;
}) {
  try {
    const msg = {
      to,
      from: process.env.FROM_EMAIL!, // must match a verified sender in SendGrid
      subject,
      text,
      html,
    };

    const result = await sgMail.send(msg);
    console.log("✅ Email sent:", result[0].statusCode);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    console.error("❌ SendGrid error:", error.response?.body || error.message);
    throw error;
  }
}
