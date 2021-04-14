module.exports.logger = (req, res, next)=>{
    console.log('Time: ', Date.now() , 'Server@', req.hostname);
    next();
  }