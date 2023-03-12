const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const contactRoute = require('./route/contactRoute');
app.use(express.json());
app.use(cors());
app.use('/', contactRoute);
// app.use(express.static('client-side/build'));
app.use(express.static(path.join(__dirname, 'client-side', 'build')));

app.get('*', (req, res) => {
  const p2 = path.join(__dirname, 'client-side', 'build', 'index.html');
  console.log(p2);
  res.sendFile(p2);
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`Server listening on port ${port}`);
});
