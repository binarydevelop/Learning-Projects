const express= require('express');
const app = express();
const router = require('./routes/router')

app.use('/router',router)


app.listen(3000, () => {
  console.log('Server is Running.')
});