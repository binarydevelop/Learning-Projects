type roles = "Admin" | "User";
type category = "Person" | "Technology";

export class component{
    
    private m_name:string;
    private m_role:roles;
    Entites: object[] =[];    
    constructor(name:string,role:roles){
        this.m_name=name;
        this.m_role=role;
        
    }

    //create Entity
    createEntity(title:string,catgory:category){
        if(this.m_role=="Admin"){
          var obj ={"title":title,
                    "category":catgory};
         this.Entites.push(obj);
        }else{
            console.log("You need to be an Admin to create Entity.");
        }
    }

    //Delete Entity
    delteEntity(title:string){
    if(this.m_role=="Admin"){
        const to_delete= this.Entites.indexOf({title:"Title"},0)
        this.Entites.splice(to_delete,1);
    }
}


    
}