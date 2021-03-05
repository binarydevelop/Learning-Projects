const hFunction = require('../utils/helperFunctions/functions');
const mongoose = require('mongoose');
let userDb = mongoose.model('users')
let entityDb = mongoose.model('entity');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');

exports.home = (req, res) => {
    res.send('works');
}

exports.getUsers = async (req, res) => {
        await userDb.find( (err,docs) => {
            if(!err){
                res.json({docs})
            } else {
                res.send(err.message);
            }
    })
}

exports.createEntity = (req, res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
        const newEntity = new entityDb({
            Title : req.body.title,
            Category : req.body.category,
            Feedbacks: []
        });
        newEntity.save(newEntity)
                 .then(data =>{
                      res.send(data);
                    })
                 .catch(err => {
                    res.status(500).send({message:err.message})
                 })
    } 

exports.deleteEntity = (req,res) => {
       entityDb.deleteOne({_id:req.params.id})
                .then( res.send(
                        {message : "Deleted Successfully."}
                        ));
   }


exports.getEntity = async (req,res) => {
       await entityDb.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    } 


exports.createUser = async(req,res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(req.body.password,salt);

            let newUser= new userDb({
                name : req.body.name,
                power: req.body.power,
                email: req.body.email,
                password: hashedPassword});
         newUser.save(newUser)
                 .then(data =>{
                        res.send(data);
                    })
                 .catch(err => {
                        res.status(500).send({message:err.message})
                    })
            
    }


exports.login = async(req,res) => {
    const userExist= await userDb.findOne({email : req.body.email})
        if(!userExist){
            return res.status(400).send('Email Does not Exist')
        } 
      
        const validPassword = bcrypt.compare(req.body.password , userExist.password)
            if(!validPassword){
                return res.status(400).send('Password is Incorrect.');
            } else {
                 const token = jwt.sign({ _id: userExist._id},process.env.SECRET_TOKEN)
                 res.header('auth-token',token).send(token);
                    if(userExist.power == "Admin"){
                        const adminToken = jwt.sign({power: userExist.power},process.env.SECRET_TOKEN)
                        res.header('admin-key',adminToken).send(adminToken);
                }
            }
        } 

exports.addFeedback = async (req,res) => {  
            let userExist = await userDb.find({ _id: req.body.id,  name : req.body.name  }).exec();
            if(userExist) { 
                let feedbackObj = { Feed : req.body.content,
                                    by: userExist[0].name,
                                    status: 'Inactive' }
                entityDb.findOneAndUpdate(
                    { '_id': req.params.id },
                    { $push: {Feedbacks: feedbackObj } } )
                        .then(data => res.send(data))
                        .catch(err => res.send(err))
            } else { 
                res.send( { message:'User Does not exist.' })}
}

exports.updateFeedback = (req,res) => {
    try{
        entityDb.findOneAndUpdate(
            { '_id':req.params.id,'Feedbacks._id' : req.params.signature },
            { $set : { 'Feedbacks.$.Feed': req.body.content } } ).exec();
    }
    catch(error) {
        res.send( { message: error.message } )
    } 
}


exports.getFeedStatus = (req,res) => {
    if(req.params.id == 11) {
    entityDb.find({_id:req.params.id,"Feedbacks.$._id": req.params.signature})
                    .then(data => {res.send(data)})
                    .catch(err =>{res.send(err)})
}  
}

exports.viewAllFeed = (req,res) => {
    if(req.params.code == 11){
       entityDb.find({_id:req.params.id , 'Feedbacks.$.Feed' : 'Active' })
       .then(data => {res.json(data)})
       .catch(err => res.send(err))
  }  
}

exports.approveFeed = (req,res) => {
    try{
        entityDb.findOneAndUpdate( { '_id':req.params.id, 'Feedbacks._id' : req.params.signature },
        { $set : { 'Feedbacks.$.status': "Active" } } ).exec();
        res.send({message:'Approved Feedback.'})
    } 
    catch(err){
        res.send({message: err.message})
    }             
} 


exports.deleteFeedback = (req,res) => {
    try{
        entityDb.findOneAndDelete( { '_id':req.params.id, 'Feedbacks._id' : req.params.signature },
        { $pull : { Feedbacks: { _id : req.params.signature }  } } ).exec();
        res.send({message:'Deleted Successfully.'});
    }
    catch(err){
        res.send({message: err.message})
    }        
} 


exports.filterByCategory = (req,res) => {
   entityDb.find({Category:req.params.m_category}).exec();
}

