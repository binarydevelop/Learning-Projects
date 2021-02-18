const express = require('express');
const path = require('path');
const fs= require('fs');
const app = express();

app.use((req,res,next)=>{
    console.log("Request Date :" +new Date(Date.now()));
    next();
})

app.use((req,res,next)=>{
    const filepath = path.join(__dirname , "static",req.url);
    fs.stat(filepath,(err,fileinfo)=>{
        if(err){
            next();
            return ;
        }
        if(fileinfo.isFile()){
            res.sendFile(filepath);
        }else{
            next();
        }
    })
})
app.use((req,res)=>{
    res.send("404 Not Found");
    res.end();
})
app.listen('3000');