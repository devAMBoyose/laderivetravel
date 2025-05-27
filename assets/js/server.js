const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-reservation', (req, res) => {
  const { name, email, phone, guests, date, destination } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com', // ✅ Namecheap's mail server
    port: 587,
    secure: false, // true for port 465, false for 587
    auth: {
      user: 'sales@laderivetravel.com',     // ✅ your Private Email
      pass: '4xlwd4bm8@'           // ✅ the email password you set in cPanel
    }
  });

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: 'sales@laderivetravel.com',
    subject: 'New Reservation Inquiry',
    html: `
      <h3>Reservation Request</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone Number:</strong> ${phone}</p>
      <p><strong>Number of Guests:</strong> ${guests}</p>
      <p><strong>Check-In Date:</strong> ${date}</p>
      <p><strong>Destination:</strong> ${destination}</p>
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
  console.log(`Server running on http://localhost:${port}`);
});
