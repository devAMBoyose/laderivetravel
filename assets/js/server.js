// server.js
require('dotenv').config(); // ✅ Load .env variables

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send', (req, res) => {
  const { Name, Email, Number, Guests, date, Destination } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com', // ✅ Namecheap’s Private Email SMTP
    port: 465,
    secure: true, // use SSL
    auth: {
      user: process.env.EMAIL_USER, // 👉 from .env
      pass: process.env.EMAIL_PASS  // 👉 from .env
    }
  });

  const mailOptions = {
    from: `"La Dérive Travel" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    subject: 'New Reservation Inquiry',
    html: `
      <h3>Reservation Request</h3>
      <p><strong>Name:</strong> ${Name}</p>
      <p><strong>Email:</strong> ${Email}</p>
      <p><strong>Phone Number:</strong> ${Number}</p>
      <p><strong>Guests:</strong> ${Guests}</p>
      <p><strong>Check-In Date:</strong> ${date}</p>
      <p><strong>Destination:</strong> ${Destination}</p>
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    res.json({ message: 'Reservation sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});