const express = require('express');

// todo Import entities routers
const signupRouter = require('./signup');
const loginRouter = require('./login');
const profileRouter = require('./profile');
const clientRouter = require('./client');
const projectRouter = require('./project');
const interventionRouter = require('./intervention');
const documentRouter = require('./document');
const resetPasswordRouter = require ('./resetPassword');

const { apiController } = require('../../controllers/api');

const { ApiError } = require('../../helpers/errorHandler');

const router = express.Router();

router.use((_, response, next) => {
    response.type('json');
    next();
});

router.all('/', apiController.home);

// todo Use entities routers
router.use('/signup', signupRouter);
router.use('/login', loginRouter);
router.use('/profile', profileRouter);
router.use('/clients', clientRouter);
router.use('/projects', projectRouter);
router.use('/interventions', interventionRouter);
router.use('/documents', documentRouter);
router.use('/resetpassword', resetPasswordRouter);

router.use(() => {
    throw new ApiError('API Route not found', { statusCode: 404 });
});

module.exports = router;
