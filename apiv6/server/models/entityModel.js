const mongoose = require('mongoose')

let entitySchema=new mongoose.Schema({
    Title :{
        type: String,
        required: true
    },
    Category :{
        type: String,
        required :true
    },
    Feedbacks : [
        {Feed: String , 
         by: String ,
         status: String  
        }]
},{timestamps:true})

const entityDb = mongoose.model('entities',entitySchema);
module.exports = entityDb;