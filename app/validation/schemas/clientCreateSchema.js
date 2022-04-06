const Joi = require('joi');

module.exports = Joi.object({
    client: Joi.object({
        firstname: Joi.string().required(),
        lastname: Joi.string().required(),
        email: Joi.string().email().required(),
        phone: Joi.string()
            // .pattern(/^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/)
            .pattern(/^0[1-9]\d{8}$/)
            .required(),
        comments: Joi.string().optional(),
        our_equipments: Joi.string().optional(),
        other_equipments: Joi.string().optional(),
        needs: Joi.string().optional(),
        provider_id: Joi.number().integer().min(1).required(),
    }),
    addresses: Joi.array().items(Joi.object({
        number: Joi.string().required(),
        street: Joi.string().required(),
        postal_code: Joi.string().required(),
        city: Joi.string().required(),
        comments: Joi.string().optional(),
    })),
}).required();
