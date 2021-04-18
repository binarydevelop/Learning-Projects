import { Injectable } from '@nestjs/common';
import { user } from './interface/user.interface';

@Injectable()
export class UsersService {

    private users: user[] = [];

    async getUsers(): Promise<user[]> {
        return await this.users;
    }

    async getUser(name: string): Promise<user> {
        return  this.users.filter(user => user.name === name)[0];
    }

    async addUser(addUserDto): Promise<user> {
        const newUser = {
            name: addUserDto.name, 
            age: addUserDto.age,
            status: addUserDto.status
        }
        this.users.push(newUser);
        return newUser;
    }

    async updateUser(name: string, status: string): Promise<user> {
        const updatedUser: user= this.users.filter(user => user.name === name)[0];
        updatedUser.status = status;
        return updatedUser;
    }

    async deleteUser(name:string): Promise<user[]> {
       const newUsers: user[] = await this.users.filter(i => i.name != name)
        return newUsers;
    }
}
