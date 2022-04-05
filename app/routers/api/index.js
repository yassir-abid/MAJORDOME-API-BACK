const express = require('express');

// todo Import entities routers
const clientRouter = require('./client');

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, response, next) => {
    response.type('json');
    next();
});

router.all('/', apiController.home);

// todo Use entities routers
router.use('/clients', clientRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
