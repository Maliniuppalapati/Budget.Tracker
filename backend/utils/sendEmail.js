const nodemailer = require('nodemailer');

let transporter = null;
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS }
  });
} else {
  console.warn('EMAIL_USER or EMAIL_PASS not set — email features disabled.');
}

const sendEmail = async (to, subject, text) => {
  if (!transporter) {
    console.log('Skipping email — transporter not configured.');
    return;
  }
  try {
    await transporter.sendMail({ from: process.env.EMAIL_USER, to, subject, text });
    console.log('Email sent to', to);
  } catch (err) { console.error('Email error', err.message); }
};

module.exports = sendEmail;
