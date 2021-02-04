const mongoose = require('mongoose');

const postSchema= mongoose.Schema({
    title: { //make it required
      type:  String,
      required :true
    },
    description : { //make it required
        type:  String,
        required :true
      },
    date: {
        type : Date,
        default: Date.now
            }
})

module.exports= mongoose.model('posts',postSchema);