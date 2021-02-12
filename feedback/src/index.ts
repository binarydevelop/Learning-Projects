import {component} from './functions';
 
//How It Works??
/*  A component class which can be used to create only two components either a user or an Admin.
    Admin creates an Entity which can have only two categories(Person, Technology).
 -->  By deault Entity contains certain member variables denoted by m_<name> and an array feedbacks for each 
      entity.
    User can give feedbacks on entites which can be displayed only when it has appreoved set by admin.
    User can delete only it's feedback.
    User can edit it's feedback.
    User can see all its feedbacks on different identites.

    Admin can delete an Entity or a feedback.
    Admin can create Entity.
    Cannot give feedback.
    read all feedbacks.
    */

let c1= new component("Test","Admin");
c1.createEntity("Title","Technology");
c1.createEntity("t2","Technology");
c1.createEntity("titletest","Person");
let u1 = new component("Tets","User");


u1.writefeedback("Title","is This is working");
u1.writefeedback("Title","is  working");
u1.writefeedback("t2","This is also working");
u1.writefeedback("t2","Added");

u1.edityourfeedbacks("Hello there is working????");

c1.approveaspecific("is  working");
u1.viewyourfeedbacks();
c1.filterby("Person");

