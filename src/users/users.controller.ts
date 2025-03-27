import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from './createUserDTO';
import { UsersService } from './users.service';
import { UpdateUserDto } from './updateUserDTO';
import { Public } from 'src/auth/auth.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from 'src/roles/role.enum';

@Controller('users')
export class UsersController {
  constructor(private userServices: UsersService) {}

  // @Public()
  // @Post('/signup')
  // async create(@Body() createUserDto: CreateUserDto) {
  //   return await this.userServices.signup(createUserDto);
  // }

  @Get()
  async findAll() {
    return await this.userServices.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.userServices.findOne(Number(id));
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return await this.userServices.updateUser(id, updateUserDto);
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.userServices.remove(id);
  }
}
