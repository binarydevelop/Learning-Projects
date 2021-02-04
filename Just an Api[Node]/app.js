const express = require('express');
const app= express();
const mongoose =require('mongoose');
const env = require('dotenv/config');
const bodyParser = require('body-parser');
//Import Routes
const postrouter = require('./routes/posts');

app.use(bodyParser.json());
//Routes
app.use('/posts',postrouter);

app.get('/',(req,res)=>{ 
    res.send('We are on Home');
})



app.listen('3000');


//connect to db
mongoose.connect(process.env.DB_CONNECTION, 
                { useNewUrlParser: true },
()=>{ 
console.log('Connected Okay!')
});