const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string()
        .email(),
    phone: Joi.string()
        .pattern(/^0[1-9]\d{8}$/),
    address: Joi.string(),
    password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/),
}).min(1).required();
