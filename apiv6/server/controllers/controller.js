const User = require('../utils/classes/user');
const Entity = require('../utils/classes/entity');
const h_function = require('../utils/Helper_functions/functions');
const db_user = require('../database/alluser');
const db_entity = require('../database/allentity');



exports.home = (req,res) => {
    res.send('works');
}

exports.getUsers = (req,res) => {
    res.send(db_user.allUser);
}

exports.createEntity = (req,res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    if(req.params.code == 00) {
        const entity = new Entity(req.body.id,req.body.category);
        allEntity.push(entity);
        res.send(db_entity.allEntity);
    } else {
        res.status(400).send({ message : "You are not an Admin"});
        return;
    }
}

exports.deleteEntity = (req,res) => {
    h_function.findDeleteEntity(allEntity,req.params.id);
    res.send(db_entity.allEntity);
}

exports.getEntity = (req,res) => {
    if(req.params.code == 00){
        res.send(db_entity.allEntity);
    } else {
        res.send('You do not have access to view as an Admin')
    }
}

exports.createUser = (req,res) => {
    //validate Request
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }

    if(req.params.code == 00){
            let new_user= new User(req.body.name,req.body.power);
            db_user.allUser.push(new_user);
            res.json(allUser);
    }else{
        res.json('You dont have permission to create a User.')
    }
}

exports.addFeedback = (req,res) => {
    if(h_function.checkIfUserExist(req.body.name,db_user.allUser)){  
        let toadd = h_function.findTheEntity(req.params.id,db_entity.allEntity);
        toadd.feedback.push({feed : req.body.content, by : req.body.name, signature : req.body.sign , status : 'Inactive'});
        res.json(toadd);
    }else{
        res.send("You do not exist as a User.")
    }
}

exports.updateFeedback = (req,res)=>{
  let toupdate = h_function.findTheEntity(req.params.m_id,db_entity.allEntity);
   for(let i=0; i < toupdate.feedback.length ; i++){
        if(req.params.signature == toupdate.feedback[i].signature ){
            toupdate.feedback[i].feed = req.body.updateit
            res.json(toupdate.feedback[i]);
        }
   }
}
      
exports.getFeedStatus = (req,res) => {
    if(req.params.id == 11){
        let toview = h_function.findTheEntity(req.params.m_id,db_entity.allEntity);
        for(let i = 0; i<toview.feedback.length; i++){
            if(toview.feedback[i].signature == req.params.signature){
                res.json(toview.feedback[i].status)
        }
     }
  }  
}

exports.viewallfeed = (req,res) => {
    if(req.params.code == 11){
        let toview = h_function.findTheEntity(req.params.m_id,db_entity.allEntity);
        for(let i = 0; i<toview.feedback.length; i++){
            if(toview.feedback[i].status == 'Active'){
                res.write(toview.feedback[i])
        }
     }
     res.end();
  }  
}


exports.approvefeed = (req,res) => {
    if(req.params.code == 00){
        let toapprove = h_function.findTheEntity(req.params.m_id,db_entity.allEntity);
            for(let i=0; i<toapprove.feedback.length; i++){
                if(toapprove.feedback[i].signature == req.params.signature && toapprove.feedback[i].status == 'Inactive'){
                    toapprove.feedback[i].status = 'Active';
                    res.send('Updated Status Successfully.')
                } else {
                    res.send('Already Active.');
                }
            }
    }else{
        res.send('You are not an Admin.')
    }
}

exports.deleteFeedback = (req,res) => {
    if(req.params.code == 00){
        let todelete =  h_function.findTheEntity(req.params.m_id,db_entity.allEntity);
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

exports.filterbycategory = (req,res) => {
    for(let i=0; i<db_entity.allEntity.length ; i++){
        if(db_entity.allEntity[i].m_category == req.params.m_category){
            res.write(JSON.stringify(db_entity.allEntity[i]))
        } else {
            res.write('Not a valid Category.')
        }
    }
    res.end();
}