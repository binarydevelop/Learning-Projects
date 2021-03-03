const {user,userLogin} = require("./user_schema");

exports.addUserValidation = async(req, res, next) => {
        const value = await user.validate(req.body)
        if(value.error) {
            res.json(value.error.details[0].message);
        }else{
            next();
        }
    }


exports.loginValidation = async(req,res,next) => {
        const value = await userLogin.validate(req.body)
        if(value.error) {
            res.json(value.error.details[0].message);
        }else{
             next();
        }
    }
