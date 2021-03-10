const hFunction = require('../utils/helperFunctions/functions');
const mongoose = require('mongoose');
const entityDb = require('../models/entityModel');
const userDb = require('../models/userModel');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');


exports.home = async(req, res) => {
    res.send('Works.')
}

exports.getUsers = async (req, res) => {
    try{
        await userDb.find( (err, docs) => {
            if(!err){
                res.send( {docs} )
            } else {
                throw new Error('Error Getting Users.')
            }
        })
    }
    catch(err) {
        res.send({error: err.message});
    }
}

exports.createEntity = (req, res) => {
    try{
        if(!req.body){
            throw new Error('Content cannot be Empty.');
        }
        const newEntity = new entityDb({
            Title : req.body.title,
            Category : req.body.category,
            Feedbacks: []
        });
        newEntity.save(newEntity)
                 .then(data => {
                      res.send(data);
                    } )
                 .catch(err => {
                    res.status(500).send( {Error:err.message} )
                 })
   }catch(error) {
        res.send({error: err.message})
    }
} 

exports.deleteEntity = async(req, res) => {
    try{
        entityDb.deleteOne( {_id:req.body.id}, (err,doc) => {
            if(err) {
                console.log(err);
                throw new Error('Error Deleting Entity.')
            } else {
                res.send({message: 'Deleted Successfully.'})
            }
        })
    }
    catch(err){
        res.send({Error:err.message})
    }
}             
   
exports.getEntity = async(req, res) => {
    try{
        await entityDb.find({}, (err, doc) => {
            res.send({doc})
        })
        if(err){
            throw new Error('Trouble Getting Entites.')
        }
    }
    catch(err) {
        res.send({Error:err.message});
    }  
} 

exports.createUser = async(req,res) => {
    try{
        if(!req.body) {
            throw new Error('Content Cannot be empty.')
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash( req.body.password, salt );

        let newUser= new userDb({
            name : req.body.name,
            power: req.body.power,
            email: req.body.email,
            password: hashedPassword });

        newUser.save(newUser)
               .then(data =>{
                    res.send(data);
                })
               .catch(err => {
                    res.send( {message:err.message} )
                })
        }
    catch(err){
        res.send(err.message);
    } 
}

exports.login = async(req, res) => {
    const userExist= await userDb.findOne( { email : req.body.email } ).exec();
        if(!userExist) {
            return res.status(400).send( 'Email Does not Exist' )
        } 
        try{ 
            const validPassword = await bcrypt.compare( req.body.password , userExist.password )
                if( !validPassword ) {
                    return res.status(400).send( 'Password is Incorrect.' );
                } else {
                    const payload = {
                        email: userExist.email,
                        power: userExist.power
                    }           
                 const token = jwt.sign( payload, process.env.SECRET_TOKEN )
                        res.send( {token} );
                }
            } 
        catch(error) {
            res.send( {error:error.message} )
        }
    } 

exports.addFeedback = async(req, res) => { 
    try{
        let userExist = await userDb.find( { email: req.user.email } ).exec();
            if(userExist.length>0) { 
                let feedbackObj = { Feed : req.body.content, 
                                    by: userExist[0].name,
                                    status: 'Inactive' }
                entityDb.findOneAndUpdate(
                    { '_id': req.body.id },
                    { $push: {Feedbacks: feedbackObj } } )
                        .then(data => res.send(data))
                        .catch(err => res.send(err.message))
            } else { 
                res.send( { message:'User Does not exist.' }
            )}
        }
    catch(err){
        res.send({Error:err.message})
    }         
}

exports.updateFeedback = async(req, res) => {
    let userExist = await userDb.find( { email: req.user.email } ).exec();
    if(userExist.length>0){
        try{
            entityDb.findOneAndUpdate(
               { '_id': req.body.id, 'Feedbacks._id': req.body.signature },
               { $set : { 'Feedbacks.$.Feed': req.body.content } }, (err, doc) => {
                   if(err){
                       throw new Error('Cannot Update Feedback.')
                   }else{
                       res.send({message: 'Updated Successfully.'})
                   }
               })
       }
    catch(error) {
        res.send( { message: error.message } )
        } 
    }
}


exports.getFeed = async(req, res) => {
    try{await entityDb.aggregate([
        {$project: { Feedbacks: {
                                  $filter: {
                                          input: "$Feedbacks",
                                          as: "feedbacks",
                                          cond: {
                  $eq: ["$$feedbacks.status", "Inactive" ]}}}}}]).exec((err,doc) => {
        if(err){
            throw new Error('Error recieving Feedbacks.')
        } else{
            res.send(doc);
        } } )}
    catch(err){
        res.send({Error : err.message})
    }  
}
  
exports.viewAllFeed = async(req, res) => {
    await entityDb.findOne( {Feedbacks: {$elemMatch: {'_id': req.body.signature, 'status': 'Active' }}}, (err, data) => {
        if(err) { 
            res.send(err) }
        else{
            res.send(data);
        }    
    })
}

exports.approveFeed = async(req, res) => {
            try{
                await entityDb.findOneAndUpdate( { '_id': req.body.id, 'Feedbacks._id': req.body.signature },
                { $set : { 'Feedbacks.$.status': "Active" } } ).exec();
                res.send( { message:'Approved Feedback.' } )
            } 
            catch(err) {
                res.send( { Error: err.message } )
            } 
        }

exports.deleteFeedback = async (req, res) => {
    try{
        await entityDb.findOneAndUpdate( { '_id':req.body.id, 'Feedbacks._id' : req.body.signature },
        { $pull : { Feedbacks: { _id : req.body.signature }  } } ).exec();
        res.send( { message:'Deleted Successfully.' });
    }
    catch(err){
        res.send({message: err.message})
    }        
} 

exports.filterByCategory = (req,res) => {
    try{
        entityDb.find( {Category: req.params.mCategory }, (err, docs) => {
            if(err){
                throw new Error('Error Getting Documents.')
            }else{
                res.send(docs);
            }
        }) 
    }
    catch(err){
        res.send( {Error:err.message} )
    }
}

