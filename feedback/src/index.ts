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

/* To Do
    Learn Validation, implement it.
    class-validator yup or joi.
*/

//create admin component
let c1= new component("Tester","Admin");
c1.createEntity("First Entity","Technology");
c1.createEntity("Second Entity","Technology");
c1.createEntity("Third Entity","Person");
c1.createEntity("Fourth Entity","Person");

//create user component
let u1 = new component("Tets","User");

//new feedbacks from user
u1.writefeedback("First Entity","Hello");
u1.writefeedback("First Entity","from");
u1.writefeedback("First Entity","Typescript.");

u1.writefeedback("Second Entity","Hello");
u1.writefeedback("Second Entity","World");
u1.writefeedback("Second Entity","in ts.");

u1.writefeedback("Third Entity","This");
u1.writefeedback("Third Entity","is third  Feedback.");

u1.writefeedback("Fourth Entity","and");
u1.writefeedback("Fourth Entity","the last one");

c1.approveaspecific("from");
u1.viewyourfeedbacks();
c1.viewall();

