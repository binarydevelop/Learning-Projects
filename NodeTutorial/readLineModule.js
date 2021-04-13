/*
ReadLine Module : Prompts the user and Get Input 
The readline module provides an interface for reading data from a Readable stream (such as process.stdin) one line at a time. It can be accessed using:
const readline = require('readline');

 */
const readLine = require('readline');
const rl= readLine.createInterface({
                          input: process.stdin,
                          output: process.stdout
                        })

rl.question('What do you think of Node.js? ', (answer) => {
      console.log(`Thank you for your valuable feedback: ${answer}`);
          rl.on('line', () => {
                 console.log(`Recieved Input: ${answer}`);
    })
         rl.close();
 });