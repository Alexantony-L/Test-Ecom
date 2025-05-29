const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendEmail = async (to, subject, html) => {
  try {
    await transporter.sendMail({
      from: 'mailid@example.com',
      to,
      subject,
      html
    });
    console.log("✅ Email sent");
  } catch (error) {
    console.error(" Email failed:", error.message);
  }
};

module.exports = sendEmail;
