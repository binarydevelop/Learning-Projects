
/*  File System Module */
const fs = require('fs');

//CREATE FILE
fs.writeFile('EXAMPLE.txt', "This is an example", (err, data) =>{
  if(err){
    console.log(err);
  } else {
    console.log('File Successfully Created');
    fs.readFile('EXAMPLE.txt', 'utf8', (err, data) => {
      if(err){
        console.log(data);
      }
    })
  }
})

fs.rename('EXAMPLE.txt', 'testing.txt', (err, data) => {
  if(err){
    console.log(err);
  }else{
    fs.readFile('testing.txt', 'utf8', (err, data) => {
      if(err){
        console.log(err)
      }
      else{
        console.log(data);
      }
    })
  }
})
fs.appendFile('testing.txt',"File Updated", (err, data) => {
  if(err){
    console.log(err);
  }else{
    console.log(data);
  }
})

fs.unlink('testing.txt', (err) => {
    if(err){
        console.log(err);
    } else {
        console.log('File Successfully deleted.');
    }
})

fs.mkdir('tutorial', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Folder created')
    }
})

fs.rmdir('tutorial', (err) => {
    if(err){
        console.log(err);
    }else{
        console.log('Folder Deleted')
    }
})