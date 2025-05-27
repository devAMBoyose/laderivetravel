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

  // ✅ Log the incoming data
  console.log('Incoming reservation:', req.body);

  const transporter = nodemailer.createTransport({
    host: 'mail.privateemail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sales@laderivetravel.com',
      pass: '4xlwd4bm8@'
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
      console.error('❌ Email error:', error);
      return res.status(500).json({ message: 'Failed to send email' });
    }
    console.log('✅ Email sent:', info.response);
    res.status(200).json({ message: 'Reservation sent successfully!' });
  });
});

app.listen(port, () => {
  console.log(`✅ Server running on http://localhost:${port}`);
});