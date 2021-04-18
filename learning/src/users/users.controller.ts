import { Controller, Get } from '@nestjs/common';
import { get } from 'node:http';
import { user } from './interface/user.interface';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}
    @Get()
    async getUsers(): Promise<user[]> {
        return this.userService.getUsers();
    }

    async getUser(name: string): Promise<user> {
        return this.userService.getUser(name);
    }

    async addUser(name: string, age: number, status:string): Promise<user> {
        return this.userService.addUser(name, age, status)
    }

    async deleteUser(name:string) :Promise<user[]>{
        return this.userService.deleteUser(name);
    }

    async updateUser(name:string, status: string): Promise<user>{
        return this.userService.updateUser(name, status);
    }
}
