const express = require('express');
const sendMail = require('./mailer'); // or adjust based on file structure

const app = express();
app.use(express.json());

app.post('/send-email', async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    const result = await sendMail({ to, subject, text });
    res.status(200).json({ message: 'Email sent!', info: result });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send email', details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));