let userDb = require('../../models/user_model')
let entityDb = require('../../models/entity_model')

module.exports.findDeleteEntity = (array,id) => {
        for(let i=0 ;i <array.length ; i++){
            if(id==array[i].m_id){
                array.splice(i,1);
            }
        }
}

module.exports.checkIfUserExist = async (req,res,next) => {
        const emailExist= await userDb.findOne({email : req.body.email})
        if(emailExist){
            return res.status(400).send('Email Already Exist')
        } else {
            next();
        } 
    }
    


module.exports.findTheEntity = (id,array) => {
    for(let i=0; i<array.length ; i++){
        if(id == array[i].m_id){
            return array[i];
        }
    }
}

/* module.exports.findTheFeedback = (array) => {
    for(let i = 0 ; i< array.length ; i++ ) {
        if(array.feedback[i].signature == req.params.signature){console.log(array.feedback[i]);
            return array.feedback[i];
            
        }
    }
} */