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

@Controller('company')
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Post('/register')
  @UseGuards(AuthGuard)
  async register(@Body() createCompanyDTO: CreateCompanyDTO, @Request() req) {
    const userId = req.user.sub;
    return await this.companyService.register(userId, createCompanyDTO);
  }

  @Get()
  async findALl() {
    return await this.companyService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.companyService.findOne(id);
  }

  @Patch('/:id')
  async updateCompany(
    @Param('id') id: number,
    @Body() updateCompanyDto: UpdateCompanyDTO,
  ) {
    return await this.companyService.updateCompany(id, updateCompanyDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.companyService.remove(id);
  }
}
