import { IsDate, IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator"

export class UpdateUserDto{
    @IsOptional()
    @IsEmail()
    email?: string

    @IsOptional()
    @IsString()
    name?: string

    @IsOptional()
    @IsString()
    password?: string
}