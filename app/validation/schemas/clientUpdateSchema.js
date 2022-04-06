const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string(),
    lastname: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string()
        // .pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
        .pattern(/^0[1-9]\d{8}$/),
    comments: Joi.string(),
    our_equipments: Joi.string(),
    other_equipments: Joi.string(),
    needs: Joi.string(),
    provider_id: Joi.number().integer().min(1),
}).min(1).required();
