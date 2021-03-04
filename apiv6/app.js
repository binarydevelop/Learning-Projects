const express = require('express');
const app = express();
const router =  require('./server/routes/router');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const connectDb = require('./server/database/connection')

app.use(bodyparser.json());

//setting up the environment
const env =  (process.env.NODE_ENV)? process.env.NODE_ENV: 'development';
const PORT = (process.env.NODE_ENV === 'development')?3000:5000;
                /* WE CAN CHANGE DIFFERENT DATABASES AND TOKENS BASED ON ENVIRONMENT */
//Redirect to routes
app.use('/', router);


connectDb();
app.listen(PORT,() => {
    console.log(`Server is running on ${PORT}`)
});