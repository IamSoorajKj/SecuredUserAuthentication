import { BrevoClient } from "@getbrevo/brevo"
import 'dotenv/config'
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"
import handlebars from "handlebars"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const client = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

export const verifyMail = async (token, email) => {
    try {
        const emailTemplateSource = fs.readFileSync(
            path.join(__dirname, "template.hbs"),
            "utf-8"
        )

        const template = handlebars.compile(emailTemplateSource)
        const htmlToSend = template({
            token: encodeURIComponent(token),
            clientUrl: process.env.CLIENT_URL || 'http://localhost:5173'
        })

        await client.transactionalEmails.sendTransacEmail({
            subject: 'Email Verification',
            htmlContent: htmlToSend,
            sender: { "name": process.env.BREVO_SENDER_NAME, "email": process.env.BREVO_SENDER_EMAIL },
            to: [{ "email": email }],
        });
        console.log('Verification email sent successfully via Brevo.');
    } catch (error) {
        console.error('Failed to send verification email via Brevo:', error.message);
    }
}