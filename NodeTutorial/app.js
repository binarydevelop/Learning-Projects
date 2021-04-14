const express= require('express');
const app = express();
const router = require('./routes/router')
const {logger} = require('./utils/middleware')

app.use('/api', logger, router)


app.listen(3000, () => {
  console.log('Server is Running.')
});