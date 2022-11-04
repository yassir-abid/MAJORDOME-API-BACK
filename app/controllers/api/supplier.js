const debug = require('debug')('SupplierController');
const supplierDataMapper = require('../../models/supplier');
const { ApiError } = require('../../helpers/errorHandler');

const supplierController = {

    /**
     * Supplier controller to get all the records.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {array<Supplier>} Route API JSON response
     */
    async getAll(request, response) {
        debug('getAll');
        const suppliers = await supplierDataMapper.findAll(request.decoded.id);

        return response.json(suppliers);
    },

    /**
     * Supplier controller to get one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Supplier} Route API JSON response
     */
    async getOne(request, response) {
        debug('getOne');
        const supplier = await supplierDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!supplier) {
            throw new ApiError('Supplier not found', { statusCode: 404 });
        }

        return response.json(supplier);
    },

    /**
     * Supplier controller to create a new supplier
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Supplier} Route API JSON response
     */
    async create(request, response) {
        debug('create');
        const supplierInfos = request.body;
        const supplier = await supplierDataMapper.isUnique(supplierInfos);

        if (supplier) {
            throw new ApiError('Supplier with this email already exists', { statusCode: 409 });
        }

        supplierInfos.provider_id = request.decoded.id;
        const savedSupplier = await supplierDataMapper.insert(supplierInfos);

        return response.json(savedSupplier);
    },

    /**
     * Supplier controller to update one record.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Supplier} Route API JSON response
     */
    async update(request, response) {
        debug('update');
        const supplier = await supplierDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!supplier) {
            throw new ApiError('Supplier not found', { statusCode: 404 });
        }

        if (request.body.email) {
            const existingSupplier = await supplierDataMapper.isUnique(
                request.body.email,
                request.params.id,
            );
            if (existingSupplier) {
                throw new ApiError('Supplier with this email already exists', { statusCode: 409 });
            }
        }
        const savedSupplier = await supplierDataMapper.update(request.params.id, request.body);

        return response.json(savedSupplier);
    },

    /**
     * Supplier controller to delete a supplier record
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {string} Route API JSON response
     */
    async delete(request, response) {
        debug('delete');
        const supplier = await supplierDataMapper.findByPk(request.params.id, request.decoded.id);

        if (!supplier) {
            throw new ApiError('Supplier not found', { statusCode: 404 });
        }

        await supplierDataMapper.delete(request.params.id);

        return response.status(204).json();
    },

};

module.exports = supplierController;
