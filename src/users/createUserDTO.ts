import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator"

export class CreateUserDto{
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    password: string
}