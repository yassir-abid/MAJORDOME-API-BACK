const clientDataMapper = require('../../models/client');

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
};

module.exports = clientController;
