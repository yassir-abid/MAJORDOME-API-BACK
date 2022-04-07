const express = require('express');

const validate = require('../../validation/validator');

const createSchema = require('../../validation/schemas/profileCreateSchema');

const signupController = require('../../controllers/api/signup');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * POST /api/signup
     * @summary Create an account
     * @tags Account
     * @returns {object} 200 - success response - application/json
     * @returns {object} 201 - created - application/json
     * @returns {ApiError} 409 - Email already exists - application/json
     */
    .post(validate('body', createSchema), controllerHandler(signupController.signup));

module.exports = router;
