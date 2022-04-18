const express = require('express');

const validate = require('../../validation/validator');

const resetPasswordSchema = require('../../validation/schemas/resetPasswordSchema');

const resetPasswordController = require('../../controllers/api/resetPassword');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * POST /api/resetpassword
     * @summary Send a reset passport request
     * @tags Reset password
     * @param {InputResetPassword} request.body.required - provider email
     * @returns {LinkToResetPassword} 201 - created - application/json
     * @returns {ApiError} 401 - Invalid email - application/json
     */
    .post(validate('body', resetPasswordSchema), resetPasswordController.askResetPassword)
    /**
     * GET /api/resetpassword
     * @summary Get reset password route
     * @tags Reset password
     * @security BearerAuth
     * @returns {Profile} 200 - success response - application/json
     * @returns {ApiError} 401 - Unauthorized - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     */
    .get(controllerHandler(resetPasswordController.verifyToken));

module.exports = router;
