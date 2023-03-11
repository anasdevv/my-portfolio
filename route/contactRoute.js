const dotenv = require('dotenv');
dotenv.config();
const router = require('express').Router();
const nodemailer = require('nodemailer');
router.post('/contact', (req, res) => {
  console.log('here');
  const data = req.body || {};
  if (
    !data ||
    data.name.length === 0 ||
    data.email.length === 0 ||
    data.message.length === 0
  ) {
    console.log('inside if');
    return res.json({
      msg: 'Please fill all the fields',
    });
  }
  console.log(process.env.GMAIL_ADDRESS);
  let smptTransporter = nodemailer.createTransport({
    service: 'Gmail',
    port: 465,
    auth: {
      user: process.env.GMAIL_ADDRESS,
      pass: process.env.GMAIL_PASSWORD,
    },
  });
  const mailOptions = {
    from: data.email,
    to: 'anas1.dev@gmail.com',
    subject: `message form ${data.name} `,
    html: `
    <h3> Information </h3>
    <ul>
    <li> Name: ${data.name} </li> 
    <li> Email: ${data.email} </li> 
    </ul>
    <h3>Message </h3>
    <p> ${data.message}  </p>
    `,
  };
  smptTransporter.sendMail(mailOptions, (error) => {
    try {
      if (error) {
        console.log(error);
        res.status(400).json({ msg: 'please fill all the fields' });
      }
      res.status(200).json({ msg: 'Thank you for contacting Anas' });
    } catch (error) {
      return res.status(500).json({ msg: 'some thing went wrong' });
    }
  });
});
module.exports = router;
