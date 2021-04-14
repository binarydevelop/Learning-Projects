const express = require('express');
const app= express();
const mongoose =require('mongoose');
const env = require('dotenv/config');
const bodyParser = require('body-parser');

const postrouter = require('./routes/posts');

app.use(bodyParser.json());

app.use('/posts', postrouter);

app.get('/',(req,res)=>{ 
    res.send('We are on Home');
})

const PORT = process.env.PORT;
app.listen('3000', () => {
    console.log(`SERVER IS RUNNING ON ${PORT}`)
});

//connect to db
mongoose.connect(process.env.DB_CONNECTION, 
                { useNewUrlParser: true },
()=>{ 
console.log(`Connected to Database ${process.env.DB_NAME}`)
});