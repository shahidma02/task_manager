import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './createUserDTO';
import { UsersService } from './users.service';
import { UpdateUserDto } from './updateUserDTO';

@Controller('users')
export class UsersController {
    constructor(private userServices: UsersService) {}

    @Post('/signup')
    async create(@Body() createUserDto: CreateUserDto) {       
        return await this.userServices.signup(createUserDto);
    }

    // @Post('/login')
    // async login(@Body() body: { email: string; password: string }) {
    //     return await this.userServices.login(body.email, body.password);
    // }

    @Get()
    async findAll() {
        return await this.userServices.findAll();
    }

    @Get('/:id')
    async findOne(@Param('id') id: number) {
        return await this.userServices.findOne(id);
    }

    @Patch('/:id')
    async updateUser(@Param('id') id:number,@Body() updateUserDto: UpdateUserDto)
    {
        return await this.userServices.updateUser(id,updateUserDto)
    }

    @Delete('/:id')
    async remove(@Param('id') id: number) {
        return await this.userServices.remove(id);
    }
}
