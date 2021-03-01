const mongoose= require('mongoose')
const connectDB = async (next) => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useNewUrlParser:true,
            useFindAndModify :false,
            useCreateIndex:true,
            useUnifiedTopology:true
        })
        console.log('Connected To MongoDB Server.')
        
    }catch(err){
        console.log(err.message);
        process.exit(1);
    }
}

module.exports = connectDB;