import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { get } from 'node:http';
import { addUserDto } from './dto/addUser.dto';
import { user } from './interface/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    async getUsers(): Promise<user[]> {
        return this.userService.getUsers();
    }

    @Get('get/:name')
    async getUser(@Param('name') name: string): Promise<user> {
        return this.userService.getUser(name);
    }

   // age will come as number due to transform: true in DTO
    @Post('add')
    async addUser(@Body(new ValidationPipe( {disableErrorMessages: false , transform: true} )) addUserDto: addUserDto ): Promise<user> {
        return this.userService.addUser(addUserDto)
    }

    @Delete('/delete/:name')
    async deleteUser(@Param('name') name:string) :Promise<user[]>{
        return this.userService.deleteUser(name);
    }

    @Put('/update/:name')
    async updateUser(@Param('name') name:string, @Body('status') status: string): Promise<user>{
        return this.userService.updateUser(name, status);
    }
}
