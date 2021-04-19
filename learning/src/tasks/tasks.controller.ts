import { Body, Controller, Delete, Get, Param, Post, Req, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { addTaskDto } from './dto/addTask.dto';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
    constructor(private taskService: TasksService){}

    @Get()
    async getTasks(){
        return this.taskService.getAllTasks();
    }

    @Post('add')
    @UsePipes(ValidationPipe)
    async addTask(@Body() descriptionBody: addTaskDto){
        const { description } = descriptionBody
        return this.taskService.addTask(description);
    }

    @Get(':id')
    async getTaskById(@Param('id',new ValidationPipe({transform: true})) id){
        return this.taskService.getTaskById(id);
    }

    @Delete('/delete/:id')
    async deleteTaskById(@Param('id') id: number){
        return this.taskService.deleteTask(id);
    }
}
