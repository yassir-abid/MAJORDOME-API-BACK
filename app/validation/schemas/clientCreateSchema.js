const Joi = require('joi');

module.exports = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email(),
    phone: Joi.string()
        // .pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
        .pattern(/^0[1-9]\d{8}$/)
        .required(),
    comments: Joi.string().optional(),
    our_equipments: Joi.string().optional(),
    other_equipments: Joi.string().optional(),
    needs: Joi.string().optional(),
    provider_id: Joi.number().integer().min(1).required(),
}).required();
