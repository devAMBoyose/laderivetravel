// server.js
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
    service: 'gmail',
    auth: {
      user: 'your.email@gmail.com',      // replace with your Gmail
      pass: 'your_app_password'          // replace with your Gmail app password
    }
  });

  const mailOptions = {
    from: Email,
    to: 'sales@laderivetravel.com',
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
      console.error('Error sending mail:', error);
      res.status(500).send('Failed to send reservation.');
    } else {
      console.log('Email sent:', info.response);
      res.send('Reservation sent successfully!');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});