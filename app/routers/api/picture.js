/* eslint-disable max-len */
const express = require('express');

const validate = require('../../validation/validator');
// const createSchema = require('../../validation/schemas/pictureCreateSchema');
const updateSchema = require('../../validation/schemas/pictureUpdateSchema');

const authenticateToken = require('../../middlewares/authenticateToken');
const upload = require('../../middlewares/upload');

const { pictureController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

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
    .get(authenticateToken, controllerHandler(controller.getAll))
    /**
     * POST /api/interventions/{interventionId}/pictures
     * @summary Add new picture to intervention
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} interventionId.path.required - intervention identifier
     * @param {InputPicture} request.body.required - Picture informations - multipart/form-data
     * @returns {Picture} 201 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention not found - application/json
     */
    // .post(authenticateToken, validate('body', createSchema), upload, controllerHandler(controller.create));
    .post(authenticateToken, upload, controllerHandler(controller.create));

router
    .route('/pictures/:pictureId(\\d+)/details')
    /**
     * PATCH /api/interventions/pictures/{pictureId}/details
     * @summary Update picture details (title and status)
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} pictureId.path.required - picture identifier
     * @param {InputPictureDetails} request.body.required - picture informations
     * @returns {Picture} 200 - success response - application/json
     * @returns {ApiError} 400 - Bad request response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .patch(authenticateToken, validate('body', updateSchema), controllerHandler(controller.updateDetails));

router
    .route('/pictures/:pictureId(\\d+)/file')
    /**
     * PATCH /api/interventions/pictures/{pictureId}/file
     * @summary Upload new picture file
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} pictureId.path.required - picture identifier
     * @param {InputPictureFile} request.body.required - new picture file to upload - multipart/form-data
     * @returns {Picture} 200 - success response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .patch(authenticateToken, upload, controllerHandler(controller.updateFile));

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
    .get(authenticateToken, controllerHandler(controller.getOne))
    /**
     * DELETE /api/interventions/pictures/{pictureId}
     * @summary Delete one picture
     * @tags Intervention Pictures
     * @security BearerAuth
     * @param {number} pictureId.path.required - picture identifier
     * @returns 204 - success response - application/json
     * @returns {ApiError} 404 - Intervention or Picture not found - application/json
     */
    .delete(authenticateToken, controllerHandler(controller.delete));

module.exports = router;
