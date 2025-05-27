const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sendMail = require('./mailer');
dotenv.config();

const app = express();

// ALLOW frontend domain
app.use(cors({
  origin: 'https://laderivetravel.com', // <-- your frontend domain
  methods: ['GET', 'POST'],
  credentials: true
}));

app.use(express.json());

app.post('/send-reservation', async (req, res) => {
  try {
    const { name, phone, email, guests, date, destination } = req.body;

    if (!name || !phone || !email || !guests || !date || !destination) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const subject = `New Reservation from ${name}`;
    const text = `
      Name: ${name}
      Phone: ${phone}
      Email: ${email}
      Guests: ${guests}
      Date: ${date}
      Destination: ${destination}
    `;

    const result = await sendMail({
      to: process.env.EMAIL_RECEIVER,
      subject,
      text
    });

    res.status(200).json({ message: 'Reservation submitted successfully!' });
  } catch (error) {
    console.error('Email Error:', error);
    res.status(500).json({ message: 'Failed to send reservation.' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});