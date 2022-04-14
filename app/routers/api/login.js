const express = require('express');

const authenticateToken = require('../../middlewares/authenticateToken');
const controllerHandler = require('../../helpers/controllerHandler');

const { flush } = require('../../middlewares/cache');
const loginController = require('../../controllers/api/login');

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
    .post(flush, controllerHandler(loginController.login));

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
