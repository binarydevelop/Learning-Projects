const hFunction = require('../utils/Helper_functions/functions');
let userDb = require('../models/user_model')
let entityDb = require('../models/entity_model')

exports.home = (req,res) => {
    res.send('works');
}

exports.getUsers = (req,res) => {
    userDb.find()
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({message:err.message})
    })
}

exports.createEntity = (req,res) => {
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

exports.createUser = (req,res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    if(req.params.code == 00){
            let newUser= new userDb({
                name : req.body.name,
                power :req.body.power,
                email: req.body.email});
         newUser.save(newUser)
                 .then(data =>{
                        res.send(data);
                    })
                 .catch(err => {
                        res.status(500).send({message:err.message})
                    })
            
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
  let toupdate = hFunction.findTheEntity(req.params.m_id,db_entity.allEntity);
   for(let i=0; i < toupdate.feedback.length ; i++){
        if(req.params.signature == toupdate.feedback[i].signature ){
            toupdate.feedback[i].feed = req.body.updateit
            res.json(toupdate.feedback[i]);
        }
   }
}
      
exports.getFeedStatus = (req,res) => {
    if(req.params.id == 11){
        
  }  
}

exports.viewAllFeed = (req,res) => {
    if(req.params.code == 11){
        let toview = hFunction.findTheEntity(req.params.m_id,db_entity.allEntity);
        for(let i = 0; i<toview.feedback.length; i++){
            if(toview.feedback[i].status == 'Active'){
                res.write(toview.feedback[i])
        }
     }
     res.end();
  }  
}


exports.approveFeed = (req,res) => {
    if(req.params.code == 00){
       let entity = entityDb.find({_id : req.params.id})
    
    }
}

exports.deleteFeedback = (req,res) => {
    if(req.params.code == 00){
        let todelete =  hFunction.findTheEntity(req.params.m_id,db_entity.allEntity);
        for(let i=0; i < todelete.feedback.length ; i++){
            if(todelete.feedback[i].signature == req.params.signature){
                todelete.feedback.splice(i,1);
                res.send('Deleted Feedback Successfully.')
            } else {
                res.send('No records Found');
            }
        }
}else{
    res.send('You are not an Admin.')
}
    }

exports.filterByCategory = (req,res) => {
   entityDb.find({Category:req.params.m_category})
}
