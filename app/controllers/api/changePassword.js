const debug = require('debug')('changePassword');
const bcrypt = require('bcrypt');
const sendEmail = require('../../utils/email');
const resetPasswordDataMapper = require('../../models/resetPassword');
const { ApiError } = require('../../helpers/errorHandler');

const bcryptSalt = process.env.BCRYPT_SALT;

const changePassword = {
    async updatePassword(request, response) {
        debug('update');
        debug(request.body);
        if (request.body.password !== request.body.passwordConfirm) {
            throw new ApiError('Password and its confirmation do not match', { statusCode: 409 });
        }
        const hash = await bcrypt.hash(request.body.password, Number(bcryptSalt));

        const updatedProfile = await resetPasswordDataMapper.updatePassword(request.body.id, hash);
        debug(updatedProfile)

        sendEmail.emailConfig(updatedProfile.email, 'Changement de mot de passe réussi', `Bonjour ${updatedProfile.firstname} ${updatedProfile.lastname},
        Votre mot de passe a été changé avec succès.`);
        await resetPasswordDataMapper.deleteToken(updatedProfile.id);
        return response.status(200).json();
    },
};

module.exports = changePassword;
