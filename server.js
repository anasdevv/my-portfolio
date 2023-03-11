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

if (process.env.NODE_ENV === 'development') {
  app.use(express.static('client-side/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client-side', 'build', 'index.html'));
  });
}

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(process.env.PORT);
  console.log(`Server listening on port ${port}`);
});
