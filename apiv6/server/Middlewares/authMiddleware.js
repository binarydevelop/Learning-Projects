const jwt = require('jsonwebtoken')
const entityDb = require('../models/userModel')

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
            res.send({message: err.message});
    }
}

exports.checkPower = (req,res,next) => {
    const adminToken = req.header('admin-key');
    if(!adminToken) {
        res.status(401).send('You cannot access this part.')
    }try{
        const isAdmin = jwt.verify(adminToken, process.env.SECRET_TOKEN);
        req.power = isAdmin; 
        next();
    }catch(err){
            console.log(err);
    }
    
    } 
