let userDb = require('../../models/userModel')
let entityDb = require('../../models/entityModel')

module.exports.checkIfUserExist = async (req,res,next) => {
        const emailExist= await userDb.findOne({email : req.body.email})
        if(emailExist){
            return res.status(400).send('Email Already Exist')
        } else {
            next();
        } 
    }

    ///



