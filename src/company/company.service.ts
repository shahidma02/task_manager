import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { CreateCompanyDTO } from './dto/createCompanyDTO';
import { PrismaService } from 'src/prisma.service';
import { UpdateCompanyDTO } from './dto/updateCompanyDTO';
import { Public } from 'src/auth/auth.decorator';
// import { AuthGuard } from 'src/auth/auth.guard';
import { UserCompanyDto } from './dto/userCompanyDto';
import { Role } from 'src/roles/role.enum';
import { DeleteUserDto } from './dto/deleteUserDto';

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async register(id: number, payload: CreateCompanyDTO): Promise<any> {
    const company = await this.prisma.company.create({
      data: payload,
    });
    const userCompanyDto = new UserCompanyDto();
    userCompanyDto.userId = id;
    userCompanyDto.companyId = company.id;
    userCompanyDto.role = Role.ADMIN;

    await this.prisma.user_Company.create({
      data: userCompanyDto,
    });

    return company;
  }

  async findAll(id: number) {
    return this.prisma.company.findMany({
      where: {
        userCompanies: {
          some: { userId: id },
        },
      },
    });
  }

  async findOne(id: number, userId: number) {
    const company = await this.prisma.company.findUnique({
      where: {
        id,
        userCompanies: {
          some: { userId },
        },
      },
    });

    if (!company) {
      throw new NotFoundException(
        `Company with ID ${id} not found or access denied`,
      );
    }

    return company;
  }

  async updateCompany(id: number, payload: UpdateCompanyDTO): Promise<any> {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return await this.prisma.company.update({
      data: payload,
      where: { id },
    });
  }

  async remove(id: number) {
    const company = await this.prisma.company.findUnique({ where: { id } });
    if (!company) {
      throw new NotFoundException(`Company with ID ${id} not found`);
    }
    return this.prisma.company.delete({ where: { id } });
  }

  async removeUser(payload: DeleteUserDto) {
    const userCompany = await this.prisma.user_Company.findUnique({
      where: {
        userId_companyId: {
          userId: payload.userId,
          companyId: payload.companyId,
        },
      },
    });
    if (!userCompany) {
      throw new NotFoundException(`Record not found`);
    }
    return this.prisma.user_Company.delete({
      where: {
        userId_companyId: {
          userId: payload.userId,
          companyId: payload.companyId,
        },
      },
    });
  }
}
