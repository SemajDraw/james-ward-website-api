require('dotenv').config();
const express = require('express');
const mailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;
const EMAIL = process.env.EMAIL;

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/send_email', (req, res) => {
    if (req.body) {
        sendEmail(req.body).then((info) => {
            res.status(200).send({message: 'Your email has been delivered.'}).end();
        }).catch((error) => {
            res.status(400).send({message: 'Your email could not be delivered.'}).end();
        });
    } else {
        res.status(400).send({message: 'Your email could not be delivered.'}).end();
    }
});

async function sendEmail(email) {
    return await buildTransporter().sendMail(mailOptions(email));
}

function mailOptions(email) {
    return {
        from: EMAIL,
        to: EMAIL,
        subject: `Website message from Name: ${email.firstName} ${email.lastName}, Email: ${email.email}`,
        text: email.message
    };
}

function buildTransporter() {
    return mailer.createTransport({
        service: 'Hotmail',
        auth: {
            user: EMAIL,
            pass: process.env.PASSWORD
        }
    });
}

app.listen(port, () => console.log('Server started'));
