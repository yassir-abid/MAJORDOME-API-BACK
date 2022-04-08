const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/interventionCreateSchema');
const updateSchema = require('../../validation/schemas/interventionUpdateSchema');

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
    .get(authenticateToken, controllerHandler(controller.getAll))
    /**
     * POST /api/interventions
     * @summary Create intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {InputIntervention} request.body.required - Intervention informations
     * @returns {Intervention} 201 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    // .post(authenticateToken, controllerHandler(controller.create));
    .post(authenticateToken, validate('body', createSchema), controllerHandler(controller.create));

router
    .route('/today')
    /**
     * GET /api/interventions/today
     * @summary Get all interventions of the day
     * @tags Intervention
     * @security BearerAuth
     * @returns {array<Intervention>} 200 - success response - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getAllOfDay));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/interventions/{id}
     * @summary Get one intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @returns {Intervention} 200 - success response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getOne))
    /**
     * PATCH /api/interventions/{id}
     * @summary Update intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @param {InputIntervention} request.body.required - intervention informations
     * @returns {Intervention} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(controller.update))
    /**
     * DELETE /api/interventions/{id}
     * @summary Delete one intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - Intervention identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 409 - Conflict - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .delete(authenticateToken, controllerHandler(controller.delete));

module.exports = router;
