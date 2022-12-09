const nodemailer = require('nodemailer');
const ApiError = require('../errors/apiError');

const sendEmail = {
    async emailConfig(email, subject, html) {
        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false,
            auth: {
                user: process.env.USER_EMAIL,
                pass: process.env.PASS_EMAIL,
            },
        });

        const options = {
            from: process.env.USER_EMAIL,
            to: email,
            subject,
            html,
        };

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
