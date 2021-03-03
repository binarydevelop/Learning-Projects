const jwt = require('jsonwebtoken')
const entityDb = require('../models/user_model')

exports.verifyToken = (req,res,next) => {
    const token = req.header('auth-token');
    if(!token) {
        res.status(401).send('Access Denied.')
    }
    try{
        const verified = jwt.verify(token, process.env.SECRET_TOKEN);
        req.user = verified; 
        next();
    }catch(err){
            res.status(400).send('Invalid Token')
    }
}