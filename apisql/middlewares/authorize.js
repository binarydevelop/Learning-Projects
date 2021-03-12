const jwt = require('jsonwebtoken')

exports.verifyToken = async(req, res, next) => {
    const token = req.header('Authorization'); 
    try{
        if(!token) {
            throw new Error('Access Denied.')
        }
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded; 
        next();
    }
    catch(err) {
            res.send({Error: err.message});
    }
}