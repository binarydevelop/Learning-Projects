//Different Ways of exporting
const functors = require('./functions');

console.log(functors.sum(1,2)); 
functors.sayHello();

//Different ways of exporting

sum = (num1, num2) => {
    return num1 + num2;
}
function sayHello(){
    console.log('Hello There.');
}
module.exports = {sayHello, sum} ;


