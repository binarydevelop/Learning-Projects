const express = require('express');
const app = express();
const router =  require('./server/routes/router');
const bodyparser = require("body-parser");


app.use(bodyparser.json());


//Redirect to routes
app.use('/', router);


app.listen('3000');