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
     * @return {string} 200 - success response - application/json
     * @return {ApiError} 401 - Invalid credentials - application/json
     */
    .post(controllerHandler(loginController.login));

module.exports = router;
