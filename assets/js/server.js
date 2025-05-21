const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/reserve', async (req, res) => {
  const { Name, email, Number, Guests, Date, Destination } = req.body;

  const transporter = nodemailer.createTransport({
    host: 'smtp.yourhost.com',
    port: 587,
    secure: false,
    auth: {
      user: 'sales@laderivetravel.com',
      pass: 'YOUR_EMAIL_PASSWORD'
    }
  });

  // Email to La Dérive Travel
  const toSales = {
    from: 'sales@laderivetravel.com',
    to: 'sales@laderivetravel.com',
    subject: 'New Reservation Request',
    text: `New Reservation:\nName: ${Name}\nEmail: ${email}\nPhone: ${Number}\nGuests: ${Guests}\nDate: ${Date}\nDestination: ${Destination}`
  };

  // Auto-reply to user
  const toUser = {
    from: 'sales@laderivetravel.com',
    to: email,
    subject: 'Thank you for your reservation!',
    text: `Hi ${Name},\n\nThank you for booking with La Dérive Travel. A representative will contact you shortly.\n\nBest regards,\nLa Dérive Travel`
  };

  try {
    await transporter.sendMail(toSales);
    await transporter.sendMail(toUser);
    res.status(200).send('Reservation submitted successfully');
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send('Error processing reservation');
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
