
const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    name :{
        type: String,
        required :true
    },
    power :{
        type:String,
        required:true
    },
    email :{
        type: String,
        required: true
    }
})

const userDb = mongoose.model('users',userSchema);
module.exports = userDb;