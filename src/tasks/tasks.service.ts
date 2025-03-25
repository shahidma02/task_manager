import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDTO } from './createTaskDTO';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(id: number, payload: CreateTaskDTO): Promise<any> {
    const task = await this.prisma.task.create({
      data: payload,
    });
    return task;
  }

  async findAll() {
    return this.prisma.task.findMany();
  }

  async findOne(id: number) {
    const task = await this.prisma.task.findUnique({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  async updateProject(id: number, payload: CreateTaskDTO): Promise<any> {
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
