import { BrevoClient } from "@getbrevo/brevo"
import "dotenv/config"

const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

export const sendOtpMail = async (email, otp) => {
    try {
        await client.transactionalEmails.sendTransacEmail({
            subject: "Password reset OTP",
            htmlContent: `<p>Your OTP for password reset is: <b>${otp}</b>. It is valid for 10 minutes.</p>`,
            sender: { "name": process.env.BREVO_SENDER_NAME, "email": process.env.BREVO_SENDER_EMAIL },
            to: [{ "email": email }],
        });
        console.log('OTP email sent successfully via Brevo.');
    } catch (error) {
        console.error('Failed to send OTP email via Brevo:', error.message);
    }
}