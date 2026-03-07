import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export interface ContactEmailPayload {
  name:    string;
  email:   string;
  message: string;
}

export async function sendContactEmail(payload: ContactEmailPayload) {
  const { name, email, message } = payload;

  const { data, error } = await resend.emails.send({
    from:    process.env.EMAIL_FROM!,
    to:      process.env.EMAIL_TO!,
    replyTo: email,
    subject: `[DEV_SYSTEM] New transmission from ${name}`,
    html: `
      <div style="font-family: monospace; background: #0a0a0a; color: #e2e8f0; padding: 32px; border-radius: 8px;">
        <h2 style="color: #00C9A7; margin-bottom: 16px;">// NEW_TRANSMISSION_RECEIVED</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="color: #64748b; padding: 8px 0; width: 120px;">IDENTITY:</td>
            <td style="color: #fff;">${name}</td>
          </tr>
          <tr>
            <td style="color: #64748b; padding: 8px 0;">FREQUENCY:</td>
            <td style="color: #fff;"><a href="mailto:${email}" style="color: #00C9A7;">${email}</a></td>
          </tr>
        </table>
        <hr style="border-color: #1F2937; margin: 20px 0;" />
        <p style="color: #64748b; margin-bottom: 8px;">PAYLOAD:</p>
        <p style="color: #e2e8f0; white-space: pre-wrap; background: #111827; padding: 16px; border-radius: 4px; border-left: 2px solid #00C9A7;">${message}</p>
        <hr style="border-color: #1F2937; margin: 20px 0;" />
        <p style="color: #374151; font-size: 12px;">// END OF LINE — DEV_SYSTEM MAILER</p>
      </div>
    `,
  });

  if (error) {
    throw new Error(`Resend error: ${error.message}`);
  }

  return data;
}