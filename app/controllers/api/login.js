const debug = require('debug')('account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginDataMapper = require('../../models/login');
const { ApiError } = require('../../helpers/errorHandler');

const loginController = {
    /**
     * Login controller to access an account.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {object} Route API JSON response
     */
    async login(request, response) {
        const user = await loginDataMapper.findByEmail(request.body);

        debug(user);

        if (!user) {
            throw new ApiError('Invalid Email and/or password', { statusCode: 401 });
        }
        if (!await bcrypt.compare(request.body.password, user.password)) {
            throw new ApiError('Invalid Email and/or password', { statusCode: 401 });
        }
        const token = jwt.sign(
            {
                id: user.id,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h',
            },
        );
        return response.json({ token });
    },
};

module.exports = loginController;
