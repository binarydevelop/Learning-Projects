import {component} from './functions';

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
c1.removefeedback("is  working");
c1.filterby("Person");

