const express= require('express');
const app = express();
const fs = require('fs');



app.get('/',(req,res)=>{
   const readstream = fs.createReadStream('./test.txt','utf8');
   readstream.on('data',(chunk)=>{
       res.write(chunk);
       res.end();
   })
})

app.post('/',(req,res)=>{
    fs.appendFileSync('./test.txt',"New Append Goes in this Text. ");
})
app.put('/',(req,res)=>{
    fs.writeFileSync('./test.txt',"This is the Updated version of the test File");
})
app.delete('/',(req,res)=>{
    fs.unlink('./test.txt', function (err) {
        if (err) throw err;
        console.log('File deleted!');
      });
})

app.listen('3000');