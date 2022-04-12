const debug = require('debug')('account');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signupDataMapper = require('../../models/signup');
const profileDataMapper = require('../../models/profile');
const { ApiError } = require('../../helpers/errorHandler');

const signupController = {
    /**
     * Signup controller to create an account.
     * ExpressMiddleware signature
     * @param {object} request Express request object
     * @param {object} response Express response object
     * @returns {object} Route API JSON response
     */
    async signup(request, response) {
        debug('signup');
        const user = await signupDataMapper.findByEmail(request.body);

        debug(user);

        if (user) {
            throw new ApiError('User with this email already exists', { statusCode: 409 });
        }

        if (request.body.password !== request.body.passwordConfirm) {
            throw new ApiError('Password and its confirmation does not match', { statusCode: 409 });
        }

        const passwordHashed = await bcrypt.hash(request.body.password, 10);

        const newUser = await profileDataMapper.insert(
            {
                firstname: request.body.firstname,
                lastname: request.body.lastname,
                email: request.body.email,
                phone: request.body.phone,
                address: request.body.address,
                password: passwordHashed,
            },
        );

        debug(newUser);

        const token = jwt.sign(
            {
                id: newUser.id,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: '2h',
            },
        );

        newUser.token = token;
        response.status(201).json(newUser);
    },
};

module.exports = signupController;
