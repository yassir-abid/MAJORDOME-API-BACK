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

router
    .route('/:id(\\d+)')
    /**
     * GET /api/clients/{id}
     * @summary Get one client and his addresses
     * @tags Client
     * @param {number} id.path.required - client identifier
     * @return {Client} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - CLient not found - application/json
     */
    .get(controllerHandler(controller.getOne));

module.exports = router;
