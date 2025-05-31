const { createTransport } = require("nodemailer");

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
    await transporter.sendMail({
      from: process.env.USER,
      to: email,
      subject: subject,
      text: text,
    });
    console.log(`Email sent to ${email}`);
  } catch (error) {
    console.error(error);
    console.error(`Failed to send email to ${email}`);
    throw new Error(`Failed to send email to ${email}: ${error.message}`);
  }
};

module.exports = sendEmail;
