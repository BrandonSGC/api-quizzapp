import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

export const sendWelcomeEmail = async (emailTo) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bransti20@gmail.com",
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const message = {
      from: "bransti20@gmail.com",
      to: emailTo,
      subject: "QuizzApp - Welcome to QuizzApp Family!",
      html: `
      <h1>QuizzApp</h1>
      <h2>Welcome to our QuizzApp Family</h2>
      <p>We hope you can enjoy and have some fun playing the default quizzes or the ones created by you!</p>
      <p>Regards, QuizzApp Team.</p>`,
    };

    const info = await transporter.sendMail(message);
    return info;
  } catch (error) {
    console.error(error);
  }
};