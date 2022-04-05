const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/clientCreateSchema');

const { clientController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/clients
     * @summary Get all clients and their addresses
     * @tags Client
     * @return {array<ClientWithAddress>} 200 - success response - application/json
     */
    .get(controllerHandler(controller.getAll))
    /**
     * POST /api/clients
     * @summary Create a client
     * @tags Client
     * @param {InputClient} request.body.required - client info
     * @return {Client} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Client not found - application/json
     */
    .post(validate('body', createSchema), controllerHandler(controller.create));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/clients/{id}
     * @summary Get one client and his addresses
     * @tags Client
     * @param {number} id.path.required - client identifier
     * @return {ClientWithAddress} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - CLient not found - application/json
     */
    .get(controllerHandler(controller.getOne));

module.exports = router;
