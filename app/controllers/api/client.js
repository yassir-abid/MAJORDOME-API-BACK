const clientDataMapper = require('../../models/client');

const { ApiError } = require('../../helpers/errorHandler');

const clientController = {
    /**
     * Client controller to get all clients
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {array<object>} Route API JSON response
     */
    async getAll(request, response) {
        const clients = await clientDataMapper.findAll();
        return response.json(clients);
    },
    /**
     * Client controller to get a record.
     * ExpressMiddleware signature
     * @param {object} request Express request object (not used)
     * @param {object} response Express response object
     * @returns {object} Route API JSON response
     */
    async getOne(request, response) {
        const client = await clientDataMapper.findByPk(request.params.id);

        if (!client) {
            throw new ApiError('Client not found', { statusCode: 404 });
        }

        return response.json(client);
    },
};

module.exports = clientController;
