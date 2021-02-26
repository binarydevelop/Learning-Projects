const joi = require('joi');

const schema  = { 
    user : joi.object({
        name : joi.string()
            .min(3)
            .max(15)
            .required(),

        power : joi.string()
            .valid("Admin","User"),
        
    })
}
module.exports = schema;