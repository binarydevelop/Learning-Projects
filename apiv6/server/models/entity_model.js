const mongoose = require('mongoose')

let entitySchema=new mongoose.Schema({
    Title :{
        type: String,
        required: true
    },
    Category :{
        type: String,
        required :true
    }
})

const entityDb = mongoose.model('entity',entitySchema);
module.exports = entityDb;