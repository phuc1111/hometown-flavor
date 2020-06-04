var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'thienphuc.dev@gmail.com',
        pass: process.env.pass
    }
});

var mailOptions = {
    from: 'thienphuc.dev@gmail.com',
    to: 'thienphuc.dev@gmail.com',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};

transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
        console.log(error);
    } else {
        console.log('Email sent: ' + info.response);
    }
});