import * as fs from 'fs';
import * as express from 'express';

// Importing the class from the location of the file 
import { crud } from "./functions"; 
let func_use = new crud('TEST.txt',"Hello World");
func_use.create("test.txt","Hello World");

const app = express();

app.get('/',(req,res)=>{
    res.send("Hello World");
})

app.listen('3000');



