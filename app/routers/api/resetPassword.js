const express = require('express');

const validate = require('../../validation/validator');

const resetPasswordAsking = require('../../validation/schemas/resetPasswordAskingSchema');

const resetPasswordSetNew = require('../../validation/schemas/resetPasswordSetNewSchema');

const resetPasswordController = require('../../controllers/api/resetPassword');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    .post(validate('body', resetPasswordAsking), controllerHandler(resetPasswordController.askResetPassword));

router
    .route('/newpassword')
    .post(validate('body', resetPasswordSetNew),controllerHandler(resetPasswordController.changePassword));

module.exports = router;
