
import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

});
console.log("EMAIL_USER loaded:", !!process.env.EMAIL_USER);
console.log("EMAIL_PASS loaded:", !!process.env.EMAIL_PASS);

export const sendEmail = async ({
  to,
  subject,
  text,
  html,
}) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html,
  };

  return await transporter.sendMail(mailOptions);
};
