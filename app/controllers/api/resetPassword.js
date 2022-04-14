const debug = require('debug')('resertPasswordController');
const dayjs = require('dayjs');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../../utils/email');
const resetPasswordDataMapper = require('../../models/resetPassword');
const { ApiError } = require('../../helpers/errorHandler');

const baseUrl = process.env.BCRYPT_SALT;

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
            throw new ApiError('Invalid Email', { statusCode: 401 });
        }

        const token = await resetPasswordDataMapper.findToken(user.id);

        if (token) {
            await resetPasswordDataMapper.deleteToken(token.id);
        }
        const resetToken = crypto.randomBytes(32).toString('hex');

        const hash = await bcrypt.hash(resetToken, Number(baseUrl));
        debug(hash);
        const expiringTime = dayjs().add(30, 'minute');
        debug(expiringTime);

        const newToken = await resetPasswordDataMapper.createToken(hash, expiringTime, user.id);
        debug(newToken.token);
        const link = `${baseUrl}/resetpassword?token=${newToken.token}&id=${user.id}`;
        debug(link);
        await sendEmail(user.email, 'Password Reset Request', `Bonjour ${user.firstname} ${user.lastname},
        Nous avons reçu une demande pour réinitialiser le mot de passe associé à votre compte Majordome. Pour continuer,
        cliquez sur le lien suivant : ${link}`);
        return link;
    },

//    async changePassword(request, response) {
//        const passwordResetToken = await resetPasswordDataMapper.findToken(request.params.id);
//
//        if (!passwordResetToken) {
//            throw new ApiError('Invalid or expired password reset token');
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
