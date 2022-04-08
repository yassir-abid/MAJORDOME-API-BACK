const express = require('express');

// const validate = require('../../validation/validator');
// const createSchema = require('../../validation/schemas/interventionCreateSchema');
// const updateSchema = require('../../validation/schemas/interventionUpdateSchema');

const authenticateToken = require('../../middlewares/authenticateToken');

const { interventionController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router
    .route('/')
    /**
     * GET /api/interventions
     * @summary Get all interventions
     * @tags Intervention
     * @security BearerAuth
     * @returns {array<Intervention>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getAll));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/interventions/{id}
     * @summary Get one intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - Intervention identifier
     * @returns {Intervention} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getOne));

module.exports = router;
