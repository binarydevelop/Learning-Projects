const express = require('express');
const morgan = require('morgan');
const {v4:uuidv4} =require('uuid');
const app= express();

morgan.token('id',(req)=>{
    return req.id;
})
app.use(assignedid)
app.use(morgan('id','combined'));

app.get('/',(req,res)=>{
    res.send('Hello')
})

function assignedid(req,res,next){
    req.id= uuidv4();
    next();
}

app.listen('3000');