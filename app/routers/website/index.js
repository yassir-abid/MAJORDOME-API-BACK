const express = require('express');

const { websiteController } = require('../../controllers/website');
const { WebsiteError } = require('../../helpers/errorHandler');
const controllerHandler = require('../../helpers/controllerHandler');

const router = express.Router();

router.use((_, response, next) => {
    response.type('html');
    next();
});

router.get('/', controllerHandler(websiteController.home));

router.use(() => {
    throw new WebsiteError('Page introuvable', { statusCode: 404 });
});

module.exports = router;
