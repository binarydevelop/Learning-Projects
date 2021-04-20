import { Catch, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { addTaskDto } from './dto/addTask.dto';
import { Task } from './interface/task.interface';

@Injectable()
export class TasksService {
    private Tasks: Task[] = []; 
    private logger = new Logger('Tasks Service')
    
    async getAllTasks(){
        try{
            this.logger.verbose('Getting all Tasks')
            if(this.Tasks.length >= 0){
                return this.Tasks;
            }
            return ({message: 'No Tasks exist currently'})
        }
        catch(err){
            Logger.error(err);
            return ({Error: 'Failed Getting Tasks', status: 500})
        }  
    }

    async getTaskById(id: number) {
        try{
            return this.Tasks.filter(idx => idx.id === id)
        }
        catch(err){
            this.logger.log('Failed Getting Task');
            return new HttpException({error: err.message}, HttpStatus.AMBIGUOUS)
        }
    }

    async addTask(description){
        try{
            const newTask = {
                id : Math.ceil(Math.random()* 100 + 25),
                description : description
            }
            this.Tasks.push(newTask);
            return this.Tasks;
        }
        catch(err){
            this.logger.log(err);
            return ({Error: `Failed Adding Task`, status: 501})
        }
    }

    async deleteTask(id: number):Promise<any>{
        try{
            if(this.Tasks.length >= 0){
                return this.Tasks.filter(idx => idx.id != id);
            }
            return ({message: 'No Tasks exist currently'})
        }
        catch(err){
            this.logger.error(err);
            return ({Error: `Failed deleting Task`, status: 400})
        }
    }
}
