const hFunction = require('../utils/Helper_functions/functions');
let userDb = require('../models/user_model')
let entityDb = require('../models/entity_model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
exports.home = (req, res) => {
    res.send('works');
}

exports.getUsers = async (req, res) => {
    let data;
    try {
        data = await userDb.find()
    }
    catch(err) {
        console.log(err)
        return null
    }
    res.send(data)
}

exports.createEntity = (req, res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    if(req.params.code == 00) {
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
}

exports.deleteEntity = (req,res) => {
   if(req.params.code == 00){
       entityDb.deleteOne({_id:req.params.id})
                .then(res.send({entityDb}));
   }
}

exports.getEntity = (req,res) => {
    if(req.params.code == 00){
        entityDb.find()
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.send(err)
        })
    } 
}

exports.createUser = async(req,res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
   
    if(req.params.code == 00){
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
}

exports.login = async(req,res) => {
    const userExist= await userDb.findOne({email : req.body.email})
    console.log(userExist)
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

exports.addFeedback = (req,res) => {
            let userExist = userDb.find({name : req.body.name})
            if(userExist){ 
                let feedbackObj = {Feed : req.body.content,
                                   by: req.body.name,
                                   status: 'Inactive'}
                entityDb.findOneAndUpdate(
                    {_id:req.params.id},
                    {$push : {Feedbacks :feedbackObj} },
                    ).then(data => res.send(data))
                     .catch(err => res.send(err))
            }
}

exports.updateFeedback = (req,res) => {
    if(req.params.code == 11){
        entityDb.findOneAndUpdate(
            {_id:req.params.id,"Feedbacks._id" : req.params.signature},
            {$set : {'Feedbacks.$.Feed': req.body.content}}
            ).then(data => {res.json(data)})
            .catch(err => {res.send(err)})
    }
}

exports.getFeedStatus = (req,res) => {
    if(req.params.id == 11){
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
    if(req.params.code == 00){
        entityDb.findOneAndUpdate(
            {_id:req.params.id, "Feedbacks._id" : req.params.signature},
            {$set : {'Feedbacks.$.status': "Active"}})
        .then(data => res.send(data))
        .catch(err => res.send(err))
    } 
}

exports.deleteFeedback = (req,res) => {
    if(req.params.code == 00){
        entityDb.findOneAndDelete(
            {_id:req.params.id,"Feedbacks._id" : req.params.signature})
            .then(data => res.send(data))
            .catch(err => res.send(err))
        }
}

exports.filterByCategory = (req,res) => {
   entityDb.find({Category:req.params.m_category})
}

