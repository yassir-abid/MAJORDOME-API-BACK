const Joi = require('joi');

module.exports = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().optional(),
    date: Joi.date().optional(),
    status: Joi.string().pattern(/^Programmée|Annulée|Terminée$/).optional(),
    comments: Joi.string().optional(),
    report: Joi.string().optional(),
    project_id: Joi.number().integer().min(1).required(),
}).required();
