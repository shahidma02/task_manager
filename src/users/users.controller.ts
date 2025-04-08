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
import { CreateUserDto } from './dto/createUserDTO';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/updateUserDTO';
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
    try {
      return await this.userServices.findAll();
    } catch (error) {
      handleError(error, 'Error finding users');
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    try {
      return await this.userServices.findOne(Number(id));
    } catch (error) {
      handleError(error, `Error finding user ${id}`);
    }
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return await this.userServices.updateUser(id, updateUserDto);
    } catch (error) {
      handleError(error, `Error up`);
    }
  }

  @Roles(Role.ADMIN)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    try {
      return await this.userServices.remove(id);
    } catch (error) {
      handleError(error, `Error deleting user ${id}`);
    }
  }
}
