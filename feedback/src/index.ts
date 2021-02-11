import {component} from './functions';

let c1= new component("Test","Admin");
c1.createEntity("Title","Technology");
c1.createEntity("t2","Technology");
let u1 = new component("Tets","User");


u1.writefeedback("Title","is This is working");
u1.editfeedBack("Title","Is this also working???");
c1.viewall();
//c1.accessSpecific("Title");