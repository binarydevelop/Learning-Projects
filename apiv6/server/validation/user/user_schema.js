const joi = require('joi');

const schema  = { 
    user : joi.object({
        name : joi.string()
            .min(3)
            .max(15)
            .required(),

        power : joi.string()
            .valid("Admin","User"),
        
        email : joi.string()
                    .email()
                    .min(6)
                    .max(124),
                    
        password : joi.string()
                      .required()
                      .min(6)
                      .max(255)
    }),

    userLogin:  joi.object({
        email: joi.string()
                    .email()
                    .min(6)
                    .max(124),

        password: joi.string()
                    .required()
                    .min(6)
                    .max(255)
    })

}


module.exports = schema;    