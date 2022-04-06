const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string()
        .pattern(/^((?:\w[\.+]?)+)@((?:\w+\.)+\w+)$/),
    phone: Joi.string(),
    address: Joi.string(),
    password: Joi.string(),
}).min(1).required();
