const express = require('express');

const controllerHandler = require('../../helpers/controllerHandler');

const { clientController: controller } = require('../../controllers/api');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/clients
     * @summary Get all clients and their addresses
     * @tags Client
     * @return {array<Client>} 200 - success response - application/json
     */
    .get(controllerHandler(controller.getAll));

module.exports = router;
