const debug = require('debug')('resertPasswordController');
const dayjs = require('dayjs');
const isBetween = require('dayjs/plugin/isBetween');
dayjs.extend(isBetween);
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const sendEmail = require('../../utils/email');
const resetPasswordDataMapper = require('../../models/resetPassword');
const { ApiError } = require('../../helpers/errorHandler');

const baseUrl = process.env.BASE_URL;
const bcryptSalt = process.env.BCRYPT_SALT;

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
        if (!user || request.body.email === undefined) {
            throw new ApiError('Invalid Email', { statusCode: 401 });
        }
        const token = await resetPasswordDataMapper.findToken(user.id);
        if (token) {
            await resetPasswordDataMapper.deleteToken(token.id);
        }
        const resetToken = crypto.randomBytes(32).toString('hex');
        const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
        debug(hash);
        const expiringTime = dayjs().add(30, 'minute').format();
        debug(expiringTime);
        const newToken = await resetPasswordDataMapper.createToken(hash, expiringTime, user.id);
        debug(newToken.token);
        const link = `${baseUrl}/resetpassword?token=${newToken.token}&id=${user.id}`;
        debug(link);
        sendEmail.emailConfig(user.email, 'Demande de réinitialisation de mot de passe', `<p>Bonjour ${user.firstname} ${user.lastname},</p>
            <p>Nous avons reçu une demande pour réinitialiser le mot de passe associé à votre compte Majordome. Pour continuer,
            cliquez sur le lien suivant :</p> <a href=${link}>Lien de réinitialisation du mot de passe</a>.
            <p>Si vous n'êtes pas à l'origine de cette demande, veuillez ignorer ce message. Votre mot de passe restera inchangé.</p>
            <p>L'équipe de Majordome</p>`);
        return response.status(200).json({ success: true });
    },

    async verifyToken(request, response) {
        debug('verifyToken');
        const userId = request.query.id;
        const passwordResetToken = await resetPasswordDataMapper.findToken(userId);

        if (!passwordResetToken) {
            throw new ApiError('Invalid or expired password reset token', { statusCode: 401 });
        }
        debug(request.query.token);
        debug(passwordResetToken.token);
        if (request.query.token !== passwordResetToken.token) {
            throw new ApiError('Invalid password reset token', { statusCode: 401 });
        }
        if (!dayjs().isBetween(
            passwordResetToken.creation_date,
            passwordResetToken.expiring_date,
        )) {
            throw new ApiError('Expired password reset token', { statusCode: 401 });
        }
        debug('success');
        return response.status(200).json(userId);
    },
};

module.exports = resetPasswordController;
