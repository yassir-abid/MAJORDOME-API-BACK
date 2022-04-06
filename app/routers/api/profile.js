const express = require('express');

const validate = require('../../validation/validator');
const updateSchema = require('../../validation/schemas/profileUpdateSchema');

const { profileController: controller } = require('../../controllers/api');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

/**
     * GET /api/profile/{id}
     * @summary Get one profile
     * @tags Profile
     * @param {number} id.path.required - profile id
     * @return {Profile} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Profile not found - application/json
     */
router.get('/:id(\\d+)', controllerHandler(controller.getOne));
/**
     * PATCH /api/profile/{id}
     * @summary Update one profile
     * @tags Profile
     * @param {number} id.path.required - profile id
     * @param {InputProfile} request.body.required - profile info
     * @return {Profile} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Profile not found - application/json
     */
router.patch('/:id(\\d+)', validate('body', updateSchema), controllerHandler(controller.update));
/**
     * DELETE /api/profile/{id}
     * @summary Delete one profile
     * @tags Profile
     * @param {number} id.path.required - profile id
     * @return {Profile} 200 - success response - application/json
     * @return {ApiError} 400 - Bad request response - application/json
     * @return {ApiError} 404 - Profile not found - application/json
     */
router.delete('/:id(\\d+)', controllerHandler(controller.delete));

module.exports = router;
