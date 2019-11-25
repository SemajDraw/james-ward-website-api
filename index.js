const express = require('express');
const mailer = require('nodemailer');

const app = express();
const port = 3000;

app.post('/send_email', (req, res) => {
    console.log(req);
});

app.listen(port, () => console.log('Server started'));
