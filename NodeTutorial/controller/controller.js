module.exports.getUsers = async (req, res, next) => {
    try{
        console.log('Mocking Asynchronous Functionality.');
        next();
    }
    catch(err){
        console.log(err)
        res.send(err.message).status(500);
    } 
}