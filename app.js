const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');

const PORT = 3000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 587,
    secure: false,
    auth: {
        user: 'nvoca@list.ru',
        pass: 'BvReiTSzTr3duXdPXtfn',
    },
});

app.post('/sendmail', (req, res) => {
    let { name, email, TIN, phone, devices } = req.body;

    let mailOptions = {
        from: 'noreply <nvoca@list.ru>',
        to: 'y7zdoh@list.ru',
        subject: 'Request',
        html: `<div>
        <p>Name: ${name}</p>
        <p>Email: ${email}</p>
        <p>TIN: ${TIN}</p>
        <p>Phone: +7${phone}</p>
        <p>количество устройств: ${devices}</p>
    </div>`,
    };

    let info = transporter.sendMail(mailOptions);

    res.send(info);
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
