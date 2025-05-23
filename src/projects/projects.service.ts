import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProjectDTO } from './dto/createProjectDto';
import { PrismaService } from 'src/prisma.service';
import { addUserDTO } from './dto/addUserDTO';
import { UpdateProjectDTO } from './updateProjectDto';

@Injectable()
export class ProjectsService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, payload: CreateProjectDTO): Promise<any> {
    const company = await this.prisma.user_Company.findFirst({
      where: { userId: id, companyId: payload.companyId },
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

    await this.prisma.project_User_Co.create({
      data: {
        userId: id,
        projectId: project.id,
      },
    });

    return project;
  }

  async findAll(companyId: number) {
    return this.prisma.project.findMany({
      where: { companyId: companyId },
    });
  }

  async findOne(projectId: number, payload: UpdateProjectDTO) {
    const project = await this.prisma.project.findUnique({
      where: {
        id: projectId,
        companyId: payload.companyId,
      },
    });
    if (!project) {
      throw new NotFoundException(`Project with ID ${projectId} not found`);
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
    const project = await this.prisma.project.findUnique({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return this.prisma.project.delete({ where: { id } });
  }

  async addUser(payload: addUserDTO) {
    const project = await this.prisma.project.findUnique({
      where: { id: payload.projectId },
    });

    if (!project) {
      throw new NotFoundException(
        `Project with ID ${payload.projectId} not found`,
      );
    }

    const userCompanies = await this.prisma.user_Company.findMany({
      where: { userId: payload.userId },
    });

    if (!userCompanies.length) {
      throw new NotFoundException(
        `User with ID ${payload.userId} not found in any company`,
      );
    }

    const isUserInCompany = userCompanies.some(
      (uc) => uc.companyId === project.companyId,
    );

    if (!isUserInCompany) {
      throw new Error('User is not a member of this company');
    }

    const { companyId, ...updatedPayload } = payload;
    return await this.prisma.project_User_Co.create({ data: updatedPayload });
  }
}
