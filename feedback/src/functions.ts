type roles = "Admin" | "User";
type category = "Person" | "Technology";
interface Entities {
    title: string;
    category: category;
    feedbacks: string[];
}

export class component{
    
    private m_name:string;
    private m_role:roles;
    static Entites: Entities[]=[];    
    constructor(name:string,role:roles){
        this.m_name=name;
        this.m_role=role;
        
    }

    //create Entity[Admin]
    createEntity(titlename:string,category:category){
        if(this.m_role==="Admin"){
        let temp :Entities= {
            title :titlename,
            category: category,
            feedbacks:[]=[]
        }
        component.Entites.push(temp);
        }
    }          
        //deleteEntity[Admin]
    deleteEntity(titlename:string){
        if(this.m_role==="Admin"){
            let todelete:number;
     for(let i=0;i<component.Entites.length;i++){
         if(component.Entites[i].title==titlename){
            component.Entites.splice(i,1);    
         }else{
             console.log('Entity Not Found.');
         }
      } 
        }        
   }
    //viewAll Entity[Admin]
  viewall(){
      if(this.m_role==="Admin"){   
      for(let i=0;i<component.Entites.length;i++){
        console.log(component.Entites[i]);
    }
  }
}
    //accessSpecific[Admin]
   accessSpecific(titlename:string){
       for(let i=0;i<component.Entites.length;i++){console.log(component.Entites.length);
           if(component.Entites[i].title==titlename){
               console.log(component.Entites[i]);
           }
       }
   }
     
                                                /* USER */
    //Writefeedback
    writefeedback(titlename:string,text:string){
        for(let i=0;i<component.Entites.length;i++){console.log('Here');
            if(component.Entites[i].title==titlename){
                component.Entites[i].feedbacks.push(text);
            }
        }
    }
}