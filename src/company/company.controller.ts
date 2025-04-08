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
import { CreateCompanyDTO } from './dto/createCompanyDTO';
import { CompanyService } from './company.service';
import { UpdateCompanyDTO } from './dto/updateCompanyDTO';
import { Public } from 'src/auth/auth.decorator';
import { Roles } from 'src/roles/roles.decorator';
import { Role } from '@prisma/client';
import { RolesGuard } from 'src/roles/roles.guard';
import { DeleteUserDto } from './dto/deleteUserDto';
import { RolesParamGuard } from 'src/roles/rolesParam.guard';

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/register')
  async register(@Body() createCompanyDTO: CreateCompanyDTO, @Request() req) {
    try {
      const userId = req.user.sub;
      return await this.companyService.register(userId, createCompanyDTO);
    } catch (error) {
      handleError(error, 'Error registering company');
    }
  }

  @Get()
  async findAll(@Request() req) {
    try {
      const userId = req.user.sub;
      return await this.companyService.findAll(userId);
    } catch (error) {
      handleError(error, 'Error finding companies');
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: number, @Request() req) {
    try {
      const userId = req.user.sub;
      return await this.companyService.findOne(id, userId);
    } catch (error) {
      handleError(error, `Error finding company ${id}`);
    }
  }

  @UseGuards(RolesParamGuard)
  @Roles(Role.ADMIN)
  @Patch('/:id')
  async updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDTO,
  ) {
    try {
      return await this.companyService.updateCompany(id, updateCompanyDto);
    } catch (error) {
      handleError(error, `Error updating company ${id}`);
    }
  }

  @UseGuards(RolesParamGuard)
  @Roles(Role.ADMIN)
  @Delete('/:id')
  async remove(@Param('id') id: number) {
    try {
      return await this.companyService.remove(id);
    } catch (error) {
      handleError(error, `Error deleting company ${id}`);
    }
  }

  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Delete()
  async removeUser(@Body() payload: DeleteUserDto) {
    try {
      return await this.companyService.removeUser(payload);
    } catch (error) {
      handleError(error, 'Error removing user from the company');
    }
  }
}
