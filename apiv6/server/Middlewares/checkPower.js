
exports.checkAdminPower = async(req, res, next) => {
    try{
        if(req.user.power === 'Admin'){
            next();
        } else {
            throw new Error('Access Denied : You\'re not an Admin')
        }
    }
    catch(err){
        res.send({Error: err.message});
    }
}

exports.checkUserPower = async(req, res, next) => {
    try{
        if(req.user.power === 'User'){
            next();
        } else {
            throw new Error('Access Denied : You\'re not a User')
        }
    }
    catch(err){
        res.send({Error: err.message});
    }
}