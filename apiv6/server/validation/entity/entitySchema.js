const joi = require('joi');

const schema  = { 
    entity : joi.object({
        title : joi.string()
            .min(3)
            .max(15)
            .required(),
            
        category : joi.string()
            .valid("Person","Technology"),

        Feedbacks : joi.array().items({
            Feed : joi.string(),
            by: joi.string(),
            status: joi.string()
                        .valid("Active","Inactive")
        })
    })
}
module.exports = schema;