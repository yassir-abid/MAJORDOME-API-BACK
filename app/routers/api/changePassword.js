const express = require('express');

const validate = require('../../validation/validator');

const changePasswordSchema = require('../../validation/schemas/changePasswordSchema');

const changePassword = require('../../controllers/api/changePassword');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * POST /api/resetpassword/changepassword
     * @summary Send new password and its confirmation
     * @tags Set new password
     * @param {InputChangePassword} request.body.required - email and its confirmation
     * @returns {Boolean} 200 - success response - application/json
     * @returns {ApiError} 409 -  Email already exists - application/json
     */
    .patch(validate('body', changePasswordSchema), controllerHandler(changePassword.updatePassword));

module.exports = router;
