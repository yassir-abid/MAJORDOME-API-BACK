const express = require('express');

const profileRouter = require('./profile');

// todo Import entities routers

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, response, next) => {
    response.type('json');
    next();
});

router.all('/', apiController.home);

// todo Use entities routers
router.use('/profile', profileRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
