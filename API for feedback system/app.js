const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const getEnttiy = require('./controller')


//import class and modules
let alluser= [];
let allentity= [];

class User{
    m_name;
    m_power;
    constructor(name,power){
        this.m_power=power;
        this.m_name=name;
    }
}

class Entity{
    m_id;
    m_title;
    m_category;
    feedback =[];
    constructor(title,category){
        this.m_id = 'id' //generateToken
        this.m_title = title;
        this.m_category = category;
        this.feedback =[];
    }
}
const length = allentity.length;

/*  00 - Admin -> http://localhost:3000/add/00 [Add new user]
       - Admin -> http://localhost:3000/add/001 [Add new Entity]
       - Admin -> http://localhost:3000/00 [View All Entities]
       - Admin -> http://localhost:3000/delete/:code/entity/:id [Delete Entity]
    20 - Admin -> http://localhost:3000/delete/:code/feedback/:id [Delete Feedback]
    11 - User  -> http://localhost:3000/add/:code/:entityid [Add feedback to an Entity] 
    
   */

app.use(bodyparser.json());

                                                    /* ADMIN */
//view all Entites by admin
//app.get('/:code',getEntity)


//Add Entity - DONE
app.post('/add/entity/:code',(req,res)=>{
    if(req.params.code == 001){
        if(req.body.category ==='Person' || req.body.category === 'Technology'){console.log('Runs');
            let new_Entity = new Entity(req.body.title,req.body.category);
            console.log('Rus');
            allentity.push(new_Entity);
            res.json({allentity})
        }
    } else {
        res.json('You cannot create entity, you are not an admin.')
    }
})

//ADD USER  -- DONE
app.post('/add/:code', (req,res) => {
    //TO-DO : Verifying token and giving Permission
    //Admin add user
    if(req.params.code == 00){
            let new_user= new User(req.body.name,req.body.power);
            alluser.push(new_user);
            res.json({alluser});
    }else{
        res.json('You CANNOT CREATE USER AS YOU are not an ADMIN.')
    }
})
    
    


//delete Entity by id -- dONE
app.delete('/delete/:code/entity/:id', (req,res) => {
    if(req.params.code == 00){
        for(let i=0; i<length; i++){
            if(allentity[i].m_id == req.params.id){
                allentity.splice(i, 1);
                res.json({allentity}); 
            }
        }
    }
})


//delete feedback in an Entity
app.delete('/delete/:code/:m_id/:id',(req,res) => {
    if(req.params.code == 00){
        for(let i=0;i<length;i++){
            if(allentity[i].m_id == req.params.m_id){
                   for(let j=0;j<allentity[i].feedback.length;j++){
                       if(allentity[i].feedback[j].id==req.params.id){
                          allentity[i].feedback.splice(j,1);
                           res.json([allentity[i].feedback[j]])
                       }
                   }
            }
        }
    }
})

//Approve feedback[:m_id = entity id and id is for feedback]
app.put('/edit/:code/:m_id/:id',(req,res) => {
if(req.params.code==0){
    for(let i=0;i<length;i++){
        if(allentity[i].m_id == req.params.m_id){
               for(let j=0;j<allentity[i].feedback.length;j++){
                   if(allentity[i].feedback[j].id==req.params.id){
                       allentity[i].feedback[j].status ='Active'
                       res.json([allentity[i].feedback[j]])
                   }
               }
        }
    }
}   
})

                                                    /* USER */

//Add feedback to an Entity --Done
app.post('/add/:code/:entityid', (req,res) => {
        if(req.params.code == 11) { 
            for(let i=0; i<allentity.length;i++){
                if(allentity[i].m_id==req.params.entityid){
                    let feed = {
                        by : req.body.name,
                        content : req.body.text,
                        status :  'Inactive'
                    }
                    allentity[i].feedback.push(feed)
                    res.json(allentity[i]);
                }
            }
        }
})

//update feedback ---Done
app.put('/update/:m_id/:id/:by',(req,res)=>{
    for(let i=0; i<length; i++) {
        if(allentity[i].m_id==req.params.m_id){
            for(let j=0; j<allentity[i].feedback.length ;j++){
                if(allentity[i].feedback[j].id==req.params.id &&
                    allentity[i].feedback[j].by==req.params.by){
                        allentity[i].feedback[j].content = req.body.content;
                        res.json(allentity[i].feedback[j]);
                    }
            }
        }
    }
})

//see status of feedback user ---Done
app.get('/staus/:m_id/:id/:by',(req,res)=>{
    for(let i=0; i<length; i++) {
        if(allentity[i].m_id==req.params.m_id){
            for(let j=0; j<allentity[i].feedback.length ;j++){
                if(allentity[i].feedback[j].id==req.params.id &&
                    allentity[i].feedback[j].by==req.params.by){   
                        res.json(allentity[i].feedback[j].status);
                    }
            }
        }
    }
})

//list all feedback
app.get('/:id',(req,res)=>{
    for(let i=0; i<length ; i++) {
        if(allentity[i].m_id==req.params.id){
            for(let j=0 ; j<allentity[i].feedback[j] ;j++){
                if(allentity[i].feedback[j].status == 'Active'){
                    console.log(allentity[i].feedback[j]);
                }
            }
        }
    }
})

app.listen('3000');