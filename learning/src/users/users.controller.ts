import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { get } from 'node:http';
import { addUser } from './dto/addUser.dto';
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

    @Post('add')
    async addUser(@Body()addUserDto: addUser ): Promise<user> {
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
