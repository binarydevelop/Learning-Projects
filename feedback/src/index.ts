import {component} from './functions';

let c1= new component("Test","Admin");
c1.createEntity("Title","Person");
c1.createEntity("Title","Technology");
c1.createEntity("Title","Technology");

console.log(c1);