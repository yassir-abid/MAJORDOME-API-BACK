const nodemailer = require('nodemailer');
const ApiError = require('../errors/apiError');

const sendEmail = {
    async emailConfig(email, subject, text) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: 'lamar.trantow44@ethereal.email',
                pass: 'zvxsSwK3aG15SaA4Rk',
            },
        });

        const options = {
            from: 'lamar.trantow44@ethereal.email',
            to: email,
            subject,
            text,
        }

        await transporter.sendMail(options, (error, response) => {
            if (error) {
                throw new ApiError('Email not sent');
            } else {
                return response.status(200).json('Email sent');
            }
        });
    },
};

module.exports = sendEmail;
