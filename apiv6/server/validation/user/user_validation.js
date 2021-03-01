const {user} = require("./user_schema");

module.exports = {
    addUserValidation: async(req, res, next) => {
        const value = await user.validate(req.body)
        if(value.error) {
            res.json(value.error);
        }else{
            next();
        }
    }
}