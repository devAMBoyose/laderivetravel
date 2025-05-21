const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/reserve', (req, res) => {
  const { Name, email, Number, Guests, Date, Destination } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.yourhost.com",
    port: 587,
    secure: false,
    auth: {
      user: "sales@laderivetravel.com",
      pass: "your-email-password"
    }
  });

  // Send to sales
  const mailOptions = {
    from: 'sales@laderivetravel.com',
    to: 'sales@laderivetravel.com',
    subject: 'New Reservation from La Dérive Travel',
    text: `New reservation:\nName: ${Name}\nEmail: ${email}\nPhone: ${Number}\nGuests: ${Guests}\nDate: ${Date}\nDestination: ${Destination}`
  };

  // Send to user
  const userOptions = {
    from: 'sales@laderivetravel.com',
    to: email,
    subject: 'Thank you for your reservation',
    text: `Hi ${Name},\n\nThank you for booking with La Dérive Travel. A representative will contact you shortly.\n\nRegards,\nLa Dérive Travel`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) return res.status(500).send(error.toString());

    transporter.sendMail(userOptions, (err, info) => {
      if (err) return res.status(500).send(err.toString());
      res.send('Reservation sent successfully');
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
