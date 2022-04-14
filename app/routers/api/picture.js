const express = require('express');

const validate = require('../../validation/validator');
const createSchema = require('../../validation/schemas/pictureCreateSchema');
const updateSchema = require('../../validation/schemas/pictureUpdateSchema');

const authenticateToken = require('../../middlewares/authenticateToken');
const { cache, flush } = require('../../middlewares/cache');
const controllerHandler = require('../../helpers/controllerHandler');

const { pictureController: controller } = require('../../controllers/api');

const router = express.Router();

router
    .route('/:interventionId(\\d+)/pictures')
    /**
     * GET /api/interventions/{interventionId}/pictures
     * @summary Get intervention pictures
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} interventionId.path.required - intervention identifier
     * @returns {array<Picture>} 200 - success response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .get(authenticateToken, cache, controllerHandler(controller.getAll))
    /**
     * POST /api/interventions/{interventionId}/pictures
     * @summary Add new picture to intervention
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} interventionId.path.required - intervention identifier
     * @param {InputPicture} request.body.required - Picture informations
     * @returns {Picture} 201 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    .post(authenticateToken, validate('body', createSchema), flush, controllerHandler(controller.create));

// todo Add flush to patch
router
    .route('/pictures/:pictureId(\\d+)')
    /**
     * GET /api/interventions/pictures/{pictureId}
     * @summary Get one picture
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} pictureId.path.required - picture identifier
     * @returns {Picture} 200 - success response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .get(authenticateToken, cache, controllerHandler(controller.getOne))
    /**
     * PATCH /api/interventions/pictures/{pictureId}
     * @summary Update picture
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} pictureId.path.required - picture identifier
     * @param {InputPicture} request.body.required - picture informations
     * @returns {Picture} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(controller.update))
    /**
     * DELETE /api/interventions/pictures/{pictureId}
     * @summary Delete one picture
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} pictureId.path.required - picture identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .delete(authenticateToken, flush, controllerHandler(controller.delete));

module.exports = router;
