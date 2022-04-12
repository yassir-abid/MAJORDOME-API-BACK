const debug = require('debug')('resertPasswordController');
// const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../../utils/email');
const resetPasswordDataMapper = require('../../models/resetPassword');
const profileDataMapper = require('../../models/profile');
const { ApiError } = require('../../helpers/errorHandler');

const resetPasswordController = {
    /**
     * AskResetPassword controller to reset a password.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Profile} Route API JSON response
     */
    async askResetPassword(request, response) {
        debug('askreset');
        const user = await resetPasswordDataMapper.findByEmail(request.body);

        if (!user) {
            throw new ApiError('Invalid Email and/or password', { statusCode: 401 });
        }

        const token = await resetPasswordDataMapper.findToken(user.id);

        if (token) {
            await resetPasswordDataMapper.deleteToken(token.id);
        }
        const resetToken = crypto.randomBytes(32).toString('hex');

        const hash = await bcrypt.hash(resetToken, Number(process.env.BCRYPT_SALT));

        const newToken = await resetPasswordDataMapper.createToken({
            token: hash,
            created_at: '2022-04-12 00:00:00+02',
            expires: '2h',
            provider_id: user.id,
        });

        const link = `${process.env.BASE_URL}/passwordReset?token=${newToken}&id=${user.id}`;

        await sendEmail(user.email, 'Password Reset Request', `Bonjour ${user.firstname} ${user.lastname},
        Pour changer votre mot de passe, veuillez cliquer sur le lien suivant : ${link}.`);
        return response.status(200);
    },

    async changePassword(request, response) {
        const passwordResetToken = await resetPasswordDataMapper.findToken(request.params.id);

        if (!passwordResetToken) {
            throw new ApiError('Invalid or expired password reset token');
//        }
//        const isValid = await bcrypt.compare(token, passwordResetToken.token);
//        if (!isValid) {
//            throw new ApiError('Invalid or expired password reset token');
//        }
//        const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));
//        await profileDataMapper.update(
//            { _id: userId },
//            { $set: { password: hash } },
//            { new: true },
//        );
//        const user = await User.findById({ _id: userId });
//        sendEmail(
//            user.email,
//            'Password Reset Successfully',
//            {
//                name: user.name,
//            },
//            './template/resetPassword.handlebars'
//        );
//        await passwordResetToken.deleteOne();
//        return true;
//    },
};

module.exports = resetPasswordController;
