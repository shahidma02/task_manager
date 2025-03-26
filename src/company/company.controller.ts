import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { CreateCompanyDTO } from './createCompanyDTO';
import { CompanyService } from './company.service';
import { UpdateCompanyDTO } from './updateCompanyDTO';
import { Public } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { DeleteUserDto } from './deleteUserDto';

@UseGuards(AuthGuard)
@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/register')
  async register(@Body() createCompanyDTO: CreateCompanyDTO, @Request() req) {
    const userId = req.user.sub;
    return await this.companyService.register(userId, createCompanyDTO);
  }

  @Get()
  async findALl(@Request() req) {
    // console.log(req.user.sub)
    const userId = req.user.sub;
    return await this.companyService.findAll(userId);
  }

  @Get('/:id')
  async findOne(@Param('id') id: number,@Request() req) {
    const userId = req.user.sub;
    console.log(userId)
    return await this.companyService.findOne(id,userId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  async updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDTO,
  ) {
    console.log('init')
    return await this.companyService.updateCompany(id, updateCompanyDto);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.companyService.remove(id);
  } 
  
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Delete()
  async removeUser(@Body() payload:DeleteUserDto) {
    console.log(payload)
    return await this.companyService.removeUser(payload);
  } 


}
