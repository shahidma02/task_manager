import { BadRequestException, Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { CreateCompanyDTO } from './createCompanyDTO';
import { PrismaService } from 'src/prisma.service';
import { UpdateCompanyDTO } from './updateCompanyDTO';
import { Public } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';

@Injectable()
export class CompanyService {
    constructor(private prisma: PrismaService) {}

    async register(id: number, payload: CreateCompanyDTO): Promise<any> { 
        const company = await this.prisma.company.create({
            data: payload,
        });    
        await this.prisma.user_Company.create({
            data: {
                userId: id,
                companyId: company.id,
                role: 'ADMIN',
            },
        });
    
        return company;
    }
    

    async findAll() {
        return this.prisma.company.findMany();
    }
    
    async findOne(id: number) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
        return company;
    }

    async updateCompany(id:number,payload:UpdateCompanyDTO):Promise<any>{
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
        return await this.prisma.company.update({
            data: payload,
            where: { id } 
        });        
    }

    async remove(id: number) {
        const company = await this.prisma.company.findUnique({ where: { id } });
        if (!company) {
            throw new NotFoundException(`Company with ID ${id} not found`);
        }
        return this.prisma.company.delete({ where: { id } });
    }
}
