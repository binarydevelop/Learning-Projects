module.exports = class Entity{
    m_id;
    m_category;
    feedback =[];
    constructor(id,category){
        this.m_id = id //generateToken
        this.m_category = category;
        this.feedback =[];
    }
}

