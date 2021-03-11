const express = require('express');
const app = express();
const PORT = process.env.PORT;
const db= require('./config/database')
const userRoutes = require('./routes/userRoutes');
const foodRoutes = require('./routes/foodRoutes');

//Test DB
 db.authenticate()
    .then(() => {
        console.log('Database Connected.')
    })
    .catch((err) => {
        console.log('Error: ' + err)
    })


//API Routes
app.use('/user', userRoutes);
app.use('/food', foodRoutes);


app.listen(3000, () => {
    console.log(`Server started.`)
}) 