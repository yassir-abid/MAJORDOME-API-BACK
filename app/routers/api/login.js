const express = require('express');

const loginController = require('../../controllers/api/login');

const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * POST /api/login
     * @summary Login to access an account
     * @tags Account
     * @param {InputLogin} request.body.required - client informations
     * @returns {Authentification} 200 - success response - application/json
     * @returns {ApiError} 401 - Invalid credentials - application/json
     */
    .post(controllerHandler(loginController.login));

module.exports = router;
