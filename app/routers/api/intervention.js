const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/interventionCreateSchema');
const updateSchema = require('../../validation/schemas/interventionUpdateSchema');
const createPictureSchema = require('../../validation/schemas/pictureCreateSchema');
const updatePictureSchema = require('../../validation/schemas/pictureUpdateSchema');

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
    .route('/:id(\\d+)/report')
    /**
     * GET /api/interventions/{id}/report
     * @summary Get intervention report
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @returns {Report} 200 - success response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getReport));

router
    .route('/:id(\\d+)/pictures')
    /**
     * GET /api/interventions/{id}/pictures
     * @summary Get intervention pictures
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @returns {array<Picture>} 200 - success response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getAllPictures))
    /**
     * POST /api/interventions/{id}/pictures
     * @summary Add new picture to intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @param {InputPicture} request.body.required - Picture informations
     * @returns {Picture} 201 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .post(authenticateToken, validate('body', createPictureSchema), controllerHandler(controller.addPicture));

router
    .route('/:interventionId(\\d+)/pictures/:pictureId(\\d+)')
    /**
     * GET /api/interventions/{interventionId}/pictures/{pictureId}
     * @summary Get one picture
     * @tags Intervention
     * @security BearerAuth
     * @param {number} interventionId.path.required - intervention identifier
     * @param {number} pictureId.path.required - picture identifier
     * @returns {Picture} 200 - success response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .get(authenticateToken, controllerHandler(controller.getOnePicture))
    /**
     * PATCH /api/interventions/{interventionId}/pictures/{pictureId}
     * @summary Update picture
     * @tags Intervention
     * @security BearerAuth
     * @param {number} interventionId.path.required - intervention identifier
     * @param {number} pictureId.path.required - picture identifier
     * @param {InputPicture} request.body.required - picture informations
     * @returns {Picture} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .patch(authenticateToken, validate('body', updatePictureSchema), controllerHandler(controller.updatePicture))
    /**
     * DELETE /api/interventions/{interventionId}/pictures/{pictureId}
     * @summary Delete one picture
     * @tags Intervention
     * @security BearerAuth
     * @param {number} interventionId.path.required - intervention identifier
     * @param {number} pictureId.path.required - picture identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .delete(authenticateToken, controllerHandler(controller.deletePicture));

router
    .route('/:id(\\d+)')
    /**
     * GET /api/interventions/{id}
     * @summary Get one intervention
     * @tags Intervention
     * @security BearerAuth
     * @param {number} id.path.required - intervention identifier
     * @returns {InterventionWithProjectAndClient} 200 - success response - application/json
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
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .delete(authenticateToken, controllerHandler(controller.delete));

module.exports = router;
