import { transporter } from "../config/mailer";
import { forgotPasswordTemplate } from "../templates/ForgotPassword";
import { notifyPasswordTemplate } from "../templates/NotifyPassword";
import { getCurrentDate } from "../utils/getCurrentDate";
import "dotenv/config";

export async function sendMailForgotPassword(email: string, name: string, paramsUrl: string) {
    const urlFull = `http://127.0.0.1:5173/changePassword/?token=${paramsUrl}`
    await transporter.sendMail({
        from: `"Atlantis" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "🔱 Atlantis 🔱 - Solicitud de cambio de contraseña",
        html: forgotPasswordTemplate(name, urlFull),
    });
}
export async function sendMailNotifyPassword(email: string, name: string,) {
    const date = getCurrentDate();
    await transporter.sendMail({
        from: `"Atlantis" <${process.env.NODEMAILER_EMAIL}>`,
        to: email,
        subject: "🔱 Atlantis 🔱 - Confirmación de Actualización de Contraseña",
        html: notifyPasswordTemplate(name, date),
    });
}
