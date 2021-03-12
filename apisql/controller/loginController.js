const db = require('../config/database');
const user = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

exports.login = async(req, res) => {
    try{
        const userExist = await user.findOne({ where: { email: req.body.email } });
        if(!userExist){
            throw new Error('User does not exist.')
        }
        const validPassword = bcrypt.compare( req.body.password , userExist.password )
        if(!validPassword){
            throw new Error('Password Incorrect.')
        }
        const payload = {
            email: userExist.email,
            power: userExist.power
        }
        const token = jwt.sign( payload, process.env.SECRET_TOKEN )
        res.send( {token} );
    }
    catch(err){
        res.send({Error: err.message})
    } 
}