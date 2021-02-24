module.exports.findDeleteEntity = (array,id) => {
        for(let i=0 ;i <array.length ; i++){
            if(id==array[i].m_id){
                array.splice(i,1);
            }
        }
}

module.exports.checkIfUserExist = (userName, array) => {
    for(let i=0 ; i<array.length ; i++){
        if(array[i].m_name == userName){
          return true; 
        }
    }
        return false;
    }


module.exports.findTheEntity = (id,array) => {
    for(let i=0; i<array.length ; i++){
        if(id == array[i].m_id){
            return array[i];
        }
    }
}