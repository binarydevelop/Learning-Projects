import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class addTaskDto{
    @IsNotEmpty()
    @MinLength(24)
    @MaxLength(256)
    description: string;
}