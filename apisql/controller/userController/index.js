const db = require('../../config/database');
const User = require('../../models/users');
const bcrypt = require('bcrypt');
const Food = require('../../models/foods');
const { QueryTypes } = require('sequelize');

exports.home = async(req, res) => {
    try{
        res.send('Test Working.');
    }
    catch(err){
        res.send({Error: err.message})
    }
}

exports.getAllUser = async(req, res) => {
   await User.findAll()
        .then((data) => {
            res.send(data);
        })
        .catch((err) => {
            console.log( err)
            res.send('Could not fetch Users.')
        })
}

exports.addUser = async(req, res) => {
    try{                                                    //MANAGED TRANSACTION
            await db.transaction(async (t) => {
            const salt =  await bcrypt.genSalt(10);
            const hashedPassword =  await bcrypt.hash( req.body.password, salt);
            await User.create({
                                username: req.body.username,
                                email: req.body.email,
                                password: hashedPassword,
                                power: req.body.power,
                                amount_due: req.body.amt_due},
                                {transaction: t}
                                )})
                                    .then(() => {
                                             res.send('User Created.')
                                     })}
                                    catch(err) { 
                                             res.send({Error : err.message})
                                             console.log(err);
                                    }} 


                                           //Managed Transaction
exports.consume = async(req, res) => {
    try{
        await db.transaction(async(t) => {
               const foodRow = await Food.findOne( { where: { food_item: req.params.item } } )
               const userRow = await User.findOne( { where: { email: req.user.email } } )
               if(!foodRow){
                   throw new Error('Food Item does not exsit.')
               }
               if(!userRow){
                   throw new Error('Trouble getting Information.')
               }
                if(foodRow.quantity > 0 && req.params.qty <= foodRow.quantity){
                     let newQuantity = foodRow.quantity - req.params.qty
                     foodRow.update({ quantity: newQuantity })
                     userRow.update({amount_due: userRow.amount_due + ( req.params.qty * foodRow.price )})
                     res.send({message: 'Purchase Successful.'})
                } else {
                     throw new Error('Insufficient Quantity.')
                   }
        })
    }
    catch(err) {
        res.send({Error: err.message})
    }
}

exports.addQuantity = async(req, res) => {
    try{
        await db.transaction(async(t) => {
            const foodRow = await Food.findOne({where: { food_item: req.params.item }})
            if(!foodRow){
                throw new Error('Item does not exist.')
            }
            let newQuantity = foodRow.quantity + parseInt(req.params.qty);
            foodRow.update({ quantity: newQuantity })
            res.send('Quantity added.')
        })
    }
    catch(err){
        console.log(err.message);
        res.send({Error: err.message})
    }
}

exports.removeQuantity = async(req, res) => {
    try{
        await db.transaction(async(t) => {
            const foodRow = await Food.findOne({where: { food_item: req.params.item }})
            if(!foodRow){
                throw new Error('Item does not exist.')
            }
            let newQuantity = foodRow.quantity - parseInt(req.params.qty);
            if(newQuantity >= 0 ){
                foodRow.update({ quantity: newQuantity })
                res.send('Quantity Removed.')
            }else{
                throw new Error('Cannot remove from unavailable quantity.')
            }
        })
    }
    catch(err){
        console.log(err.message);
        res.send({Error: err.message})
    }
}

exports.totalDues = async(req, res) => {
    try{
        await db.transaction(async(t) => {
             db.query('SELECT SUM(amount_due) FROM users',
                        { type: QueryTypes.SELECT })
                        .then((result) => {
                            res.json(result[0]);
                        })
                        .catch((err) => {
                            res.send({Error: err.message})
                        })
        })
    }
    catch(err) { 
        console.log(err.message);
        res.send('Could not calculate Total Dues.')
    } 
}

// TO-DO  :
//Detailed Transaction for each user 