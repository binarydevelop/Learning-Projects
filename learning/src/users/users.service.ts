import { Injectable, Logger } from '@nestjs/common';
import { user } from './interface/user.interface';

@Injectable()
export class UsersService {
    private logger = new Logger('User Service');
    private users: user[] = [];

    async getUsers(): Promise<any> {
        try{
            this.logger.log('Getting Users');
            if(this.users.length <= 0 ){
                return ({message: "No Users Found", status: "404"})
            }
        }
        catch(err){
            this.logger.error(err);
            return ({message: "Failed Finding Users"})
        }
        return await this.users;
    }

    async getUser(name: string): Promise<any> {
        try{
            this.logger.log('Getting Users');
            if(this.users.length <= 0 ){
                return ({message: "No Users currently", status: "404"})
            }
            return  this.users.filter(user => user.name === name)[0];
        }
        catch(err){
            this.logger.error(err.stack)
        }
    }

    async addUser(addUserDto): Promise<user> {
        try{
            this.logger.log('Adding User');
            const newUser = {
                name: addUserDto.name, 
                age: addUserDto.age,
                status: addUserDto.status
            }
            this.users.push(newUser);
            return newUser;
        }
        catch(err){
            this.logger.error(err);
        }
    }

    async updateUser(name: string, status: string): Promise<any> {
        try{
            this.logger.log('Getting Users');
            if(this.users.length <= 0 ){
                return ({message: "No Users currently", status: "404"})
            }
            const updatedUser: user= this.users.filter(user => user.name === name)[0];
            updatedUser.status = status;
            return updatedUser;
        }
        catch(err){
            this.logger.log(err);
        }
    }

    async deleteUser(name:string): Promise<any> {
        try{
            this.logger.log('Getting Users');
            if(this.users.length <= 0 ){
                return ({message: "No Users currently", status: "404"})
            }
            const newUsers: user[] = await this.users.filter(i => i.name != name)
            return newUsers;
        }
        catch(err){
            this.logger.error(err);
        }
    }
}
