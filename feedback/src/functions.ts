
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
            feedbacks:[]=[],
        }
        component.Entites.push(temp);
        }else{
            throw('Error Occured. Make sure you are an Admin.')
        }
    }          
        //deleteEntity[Admin]
    deleteEntity(titlename:string){
        if(this.m_role==="Admin"){
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
        console.log(((component.Entites[i].feedbacks.length)/2)-1 + " feedbacks are there.");
    }
  }else{
      throw('Sorry You need to be an Admin.');
  }
   }

    //accessSpecific[Admin]
   accessSpecificEntity(titlename:string){
       for(let i=0;i<component.Entites.length;i++){
           if(component.Entites[i].title==titlename){
               console.log(component.Entites[i]);
           }
       }
   }

   //Approve a Feedback[Admin]
   approveaspecific(titlename:string){
    for(let i=0;i<component.Entites.length;i++){
        for(let j=0;j<component.Entites[i].feedbacks.length;j++){
            if( component.Entites[i].feedbacks[j]==titlename){
                component.Entites[i].feedbacks[j+2]="Approved";
            }
        }
    }
   }
   //remove feedback
   
     
                                                /* USER */
    //Writefeedback with username
    writefeedback(titlename:string,text:string,status:string="Not Approved"){
        for(let i=0;i<component.Entites.length;i++){
            if(component.Entites[i].title==titlename){
                let username=this.m_name;
                component.Entites[i].feedbacks.push(text,username,status);
            }
        }
    }
    
    //view self feedbacks
  viewyourfeedbacks(){
      for(let i=0;i<component.Entites.length;i++){
          for(let j=0;j<component.Entites[i].feedbacks.length;j++){
              if(component.Entites[i].feedbacks[j]==this.m_name){
                  console.log(component.Entites[i].feedbacks[j-1].toUpperCase());
              }
          }
      }
  }
    
  edityourfeedbacks(texttoappend:string){
    for(let i=0;i<component.Entites.length;i++){
        for(let j=0;j<component.Entites[i].feedbacks.length;j++){
            if(component.Entites[i].feedbacks[j]==this.m_name){
                component.Entites[i].feedbacks[j-1] += texttoappend;
                break;
            }
        }
        break;
    }
  }

}