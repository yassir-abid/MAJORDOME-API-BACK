const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
    // .pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
        .pattern(/^0[1-9]\d{8}$/)
        .required(),
    address: Joi.string().optional(),
    comments: Joi.string().optional(),
}).required();
