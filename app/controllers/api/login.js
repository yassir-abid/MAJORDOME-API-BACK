const debug = require('debug')('account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const loginDataMapper = require('../../models/login');
const profileDataMapper = require('../../models/profile');
const { ApiError } = require('../../helpers/errorHandler');

const baseUrl = process.env.BASE_FILE_URL;

const loginController = {
    /**
     * Login controller to access an account.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {Token} Route API JSON response
     */
    async login(request, response) {
        debug('login');
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
        return response.json({
            logged: true,
            pseudo: `${user.firstname} ${user.lastname}`,
            token,
            picture: `${baseUrl}avatar/${user.picture}`,
        });
    },

    /**
     * Login controller to check user id
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {object} Route API JSON response
     */
    async checkuser(request, response) {
        debug('checkuser');
        const user = await profileDataMapper.findByPk(request.decoded.id);
        if (!user) {
            return response.json({
                logged: false,
                pseudo: undefined,
            });
        }
        return response.json({
            logged: true,
            pseudo: `${user.firstname} ${user.lastname}`,
        });
    },
};

module.exports = loginController;
