const {entity} =require("./entity_schema");

module.exports = {
    addEntityValidation: async(req,res,next) => {
        const value = await entity.validate(req.body)
        if(value.error) {
            res.json(value.error.details[0].message)
        }else{
            next();
        }
    }
}