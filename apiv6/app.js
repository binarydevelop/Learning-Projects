const express = require('express');
const app = express();
const router =  require('./server/routes/router');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();


app.use(bodyparser.json());


//Redirect to routes
app.use('/', router);


app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
});