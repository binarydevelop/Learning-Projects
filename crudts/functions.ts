import * as fs from "fs";

export class crud{
    private fname:string;
     private texttowrite:string;
        private newname:string;

    constructor(fname:string,texttowrite:string){
        this.fname=fname;
        this.texttowrite=texttowrite;
    }

    create(filename,text){
      fs.writeFileSync(filename,text);
    }

    append(filename,text){
        fs.appendFile(filename,text,(err)=>{
            console.log(err);
        });
    }

    renameFile(filename,newname){
        fs.rename(filename,newname,(err)=>{console.log(err)});
    }

    read(filename,encoding){
        if(encoding=='undefined'){
            encoding='utf8';
        }
            fs.readFile(filename,encoding);
    }
    deleteFile(filename){
        fs.unlink(filename,(err)=>{
            console.log(err);
        })
    }
};