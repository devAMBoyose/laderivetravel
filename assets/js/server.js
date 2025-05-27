const { Name, Number, Email, Guests, date, Destination } = req.body;

const mailOptions = {
  from: 'your.email@gmail.com',
  to: 'sales@laderivetravel.com',
  subject: 'New Reservation Request',
  html: `
    <h2>Reservation Details</h2>
    <p><strong>Name:</strong> ${Name}</p>
    <p><strong>Phone Number:</strong> ${Number}</p>
    <p><strong>Email:</strong> ${Email}</p>
    <p><strong>Number of Guests:</strong> ${Guests}</p>
    <p><strong>Check-In Date:</strong> ${date}</p>
    <p><strong>Destination:</strong> ${Destination}</p>
  `
};