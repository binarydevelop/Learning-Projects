const express= require('express');
const route = express.Router();
let accounts= require('./database')

//GET REQUEST
route.get('/',(req,res)=>{
    res.json({ accounts})
})


//getting information using params
route.get('/:id',(req,res)=>{
    const accountid= Number(req.params.id);
    //console.log(typeof(accounts))
    for(let i=0;i<accounts.length;i++){
        if(accounts[i].id===accountid){
            let getdata= accounts[i];
            res.json({getdata})
        }
    }
})

//POST Request
route.post('/',(req,res)=>{
    const incoming_data= req.body;
    accounts.push(incoming_data);
    res.json({accounts});
})

//PUT REQUEST
route.put('/:id',(req,res)=>{
    let getdata;
    let body = req.body
    const id=  Number(req.params.id);
    for(let i=0;i<accounts.length;i++){
        if(accounts[i].id===id){
            getdata=accounts[i];
        }
    }

    if(!getdata){
        res.status(500).send('NOT FOUND');
    }else{
        console.log({...getdata,...body});
        const updated= {...getdata,...body};
        accounts[id]= updated; 
        res.json(accounts[id])
    }
})



module.exports = route;