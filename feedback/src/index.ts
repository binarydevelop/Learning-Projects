import {component} from './functions';

let c1= new component("Test","Admin");
c1.createEntity("Title","Technology");
c1.createEntity("t2","Technology");

let u1 = new component("Tets","User");
//console.log(c1);
//c1.accessSpecific("Title");

u1.writefeedback("Title","is This is working");
c1.accessSpecific("Title");
//c1.accessSpecific("Title");