import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDTO } from './createProjectDto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, payload: CreateProjectDTO): Promise<any> {
    const company = await this.prisma.user_Company.findFirst({
      where: { userId: id },
      select: { companyId: true },
    });

    if (!company) {
      throw new Error('Company not found for the given user.');
    }

    const project = await this.prisma.project.create({
      data: {
        ...payload,
        companyId: company.companyId,
      },
    });

    return project;
  }

  async findAll() {
    return this.prisma.project.findMany();
  }

  async findOne(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async updateProject(id: number, payload: CreateProjectDTO): Promise<any> {
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return await this.prisma.project.update({
      data: payload,
      where: { id },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.project.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return this.prisma.project.delete({ where: { id } });
  }
}
