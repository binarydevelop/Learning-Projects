const {user} =require("./user_schema");

module.exports = {
    addUserValidation: async(req,res,next) => {
        const value = await user.validate(req.body)
        if(value.error) {
            console.log(value.error)
            res.send(value.error.details[0].message)
        }else{
            next();
        }
    }
}