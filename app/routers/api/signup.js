const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/profileCreateSchema');

const { flush } = require('../../middlewares/cache');
const controllerHandler = require('../../helpers/controllerHandler');

const signupController = require('../../controllers/api/signup');

const router = express.Router();

router
    .route('/')
    /**
     * POST /api/signup
     * @summary Create an account
     * @tags Account
     * @param {InputSignup} request.body.required - client informations
     * @returns {ProfileAndToken} 201 - created - application/json
     * @returns {ApiError} 409 - Email already exists - application/json
     */
    .post(validate('body', createSchema), flush, controllerHandler(signupController.signup));

module.exports = router;
