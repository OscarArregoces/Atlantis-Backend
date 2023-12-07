import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PWD,
    },
});

transporter.verify().then(() => {
    console.log("NODEMAILER READY FOR SEND");
});

export { transporter };