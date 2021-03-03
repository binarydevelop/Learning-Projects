let userDb = require('../../models/user_model')
let entityDb = require('../../models/entity_model')

module.exports.checkIfUserExist = async (req,res,next) => {
        const emailExist= await userDb.findOne({email : req.body.email})
        if(emailExist){
            return res.status(400).send('Email Already Exist')
        } else {
            next();
        } 
    }



