import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Req, Res, UseFilters, UsePipes, ValidationPipe } from '@nestjs/common';
import { logPipe } from 'src/common/pipes/validation.pipe';
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
    @UsePipes(ValidationPipe, logPipe)
    async addTask(@Body() descriptionBody: addTaskDto){
        const {description} = descriptionBody
        console.log(description)
        return await this.taskService.addTask(description);
    }

    @Get(':id')
    async getTaskById(@Param('id', ParseIntPipe) id:number){
        return await this.taskService.getTaskById(id);
    }

    @Delete('/delete/:id')
    async deleteTaskById(@Param('id', ParseIntPipe) id: number){
        return this.taskService.deleteTask(id);
    }
}
