import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendEmail = async (messageConfig) => {
  try {
    const { to, subject, html, text = "" } = messageConfig;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bransti20@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const message = {
      from: "bransti20@gmail.com",
      to,
      subject,
      html,
      text, // Plain Text
    };

    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.error(error);
  }
};
