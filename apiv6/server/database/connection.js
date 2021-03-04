const mongoose= require('mongoose')
const connectDB = async (next) => {
    const URI= (process.env.NODE_DEV === 'production')?process.env.MONGO_URI_PROD:process.env.MONGO_URI_DEV
    try{
        const con = await mongoose.connect(URI,{
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