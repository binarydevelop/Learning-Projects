//get db_entity length here
let id_count = 0;
module.exports = class Entity{
    m_id;
    m_title;
    m_category;
    feedback =[];
    constructor(title,category){
        this.m_title = title;
        this.m_id = id_count++;
        this.m_category = category;
        this.feedback =[];
    }
}

