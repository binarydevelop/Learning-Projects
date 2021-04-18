import { IsIn, IsNotEmpty, Length, MaxLength, MinLength } from "class-validator";
enum userStatus{
    Active = 'Active',
    Inactive =  'Inactive'
}
export class addUserDto {
    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(120)
    name: string;

    @IsNotEmpty()
    age: number;

    @IsNotEmpty()
    @IsIn([userStatus.Active, userStatus.Inactive])
    status: number;
}