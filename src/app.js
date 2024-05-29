const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = 80;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello from Netlify Functions!');
  });

const transporter = nodemailer.createTransport({
    host: 'smtp.mail.ru',
    port: 587,
    secure: false,
    auth: {
        user: 'nvoca@list.ru',
        pass: 'BvReiTSzTr3duXdPXtfn',
    },
});
app.get('', (req, res) => {
    res.send("vocaTechContentTeplate");  
});

app.post('/sendmail', (req, res) => {
    let { name, email, TIN, phone, devices } = req.body;

    let mailOptions = {
        from: 'noreply <nvoca@list.ru>',
        to: 'ceo@voca.tech',
        subject: 'Заявка с vocaTech',
        html: `<div>
        <p>Имя: ${name}</p>
        <p>Email: ${email}</p>
        <p>ИНН: ${TIN}</p>
        <p>Телефон: +7${phone}</p>
        <p>количество устройств: ${devices}</p>
    </div>`,
    };

    let info = transporter.sendMail(mailOptions);

    res.send(info);
});

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});
