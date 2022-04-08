const express = require('express');

const authenticateToken = require('../../middlewares/authenticateToken');

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
     * @returns {Token} 200 - success response - application/json
     * @returns {ApiError} 401 - Invalid credentials - application/json
     */
    .post(controllerHandler(loginController.login));

router
    .route('/checkuser')
    /**
     * GET /api/login/checkuser
     * @summary Check User
     * @tags Account
     * @security BearerAuth
     * @returns {CheckUser} 200 - success response - application/json
     * @returns {ApiError} 401 - Invalid authentification - application/json
     */
    .get(authenticateToken, controllerHandler(loginController.checkuser));

module.exports = router;
