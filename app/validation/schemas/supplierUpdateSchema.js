const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
    // .pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
        .pattern(/^0[1-9]\d{8}$/),
    address: Joi.string(),
    comments: Joi.string(),

}).min(1).required();
