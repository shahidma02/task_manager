import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './createTaskDTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateTaskDTO): Promise<any> {
    const task = await this.prisma.task.create({
      data: payload,
    });
    return task;
  }

  async findAll(projectId) {
    return this.prisma.task.findMany({
      where: { projectId: projectId.projectId },
    });
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateTask(id: number, payload: CreateTaskDTO): Promise<any> {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return await this.prisma.task.update({
      data: payload,
      where: { id },
    });
  }

  async remove(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return this.prisma.task.delete({ where: { id } });
  }
}
