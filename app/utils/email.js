const nodemailer = require('nodemailer');

const sendEmail = async (email, subject, text) => {
    try {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'lamar.trantow44@ethereal.email',
                pass: 'zvxsSwK3aG15SaA4Rk',
            },
        });

        await transporter.sendMail({
            from: process.env.USER,
            to: email,
            subject,
            text: '',
        });

        transporter.close();

        console.log('email sent sucessfully');
    } catch (error) {
        console.log(error, 'email not sent');
    }
};

module.exports = sendEmail;
