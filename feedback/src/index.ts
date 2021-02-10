import {component} from './functions';

let c1= new component("Test","Admin");
c1.createEntity("Title","Person");
console.log(c1.Entites[0]);