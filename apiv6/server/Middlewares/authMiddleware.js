const jwt = require('jsonwebtoken')
const entityDb = require('../models/userModel')

exports.verifyToken = async(req, res, next) => {
    const token = req.header('auth-token'); 
    if(!token) {
        res.status(401).send('Access Denied.')
    }
    try{
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = decoded; 
        next();
    }catch(err) {
            res.send({error: err.message});
    }
}

