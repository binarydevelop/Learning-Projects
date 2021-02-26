const joi = require('joi');

const schema  = { 
    entity : joi.object({
        title : joi.string()
            .min(3)
            .max(15)
            .required(),
            
        category : joi.string()
            .valid("Person","Technology")
    })
}
module.exports = schema;