const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json());
const port = 3000;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'diagnocare31@gmail.com',
    pass: 'emje szle ombn vgnp'
  }
});

app.post('/send-mail', (req, res) => {
  const { to, subject, text } = req.body;
    console.log(to);
  const mailOptions = {
    from: 'diagnocare31@gmail.com',
    to: to,
    subject: subject,
    text: text
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).send('Error sending email');
    } else {
      console.log('Email sent:', info.response);
      res.status(200).send('Email sent successfully');
    }
  });
});

app.listen(port, () => {
  console.log(`Node.js app listening at http://localhost:${port}`);
});
