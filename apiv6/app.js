const express = require('express');
const app = express();
const router =  require('./server/routes/router');
const bodyparser = require("body-parser");
const dotenv = require('dotenv');
dotenv.config();

const connectDb = require('./server/database/connection')

app.use(bodyparser.json());


//Redirect to routes
app.use('/', router);


connectDb();
app.listen(process.env.PORT,() => {
    console.log(`Server is running on ${process.env.PORT}`)
});