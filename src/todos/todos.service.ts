import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTodoDTO } from './createTodoDTO';
import { addDays } from 'date-fns';
import { assignTodoDTO } from './assignTodoDTO';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(payload: CreateTodoDTO): Promise<any> {
    const { duration, ...data } = payload;
    const dueDate = addDays(new Date(), duration);

    const todo = await this.prisma.todo.create({
      data: {
        ...data,
        due_at: dueDate,
      },
    });

    return todo;
  }

  async findAll() {
    return this.prisma.todo.findMany();
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`todo with ID ${id} not found`);
    }
    return todo;
  }

  async updateTodo(id: number, payload: CreateTodoDTO): Promise<any> {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`todo with ID ${id} not found`);
    }

    return await this.prisma.todo.update({
      data: payload,
      where: { id },
    });
  }

  async remove(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`todo with ID ${id} not found`);
    }
    return this.prisma.todo.delete({ where: { id } });
  }

  async assignTodo(payload: assignTodoDTO) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: payload.todoId },
      include: { task: { include: { project: true } } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${payload.todoId} not found`);
    }

    const userProject = await this.prisma.project_User_Co.findFirst({
      where: {
        userId: payload.userId,
        projectId: todo.task.project.id,
      },
    });

    if (!userProject) {
      throw new NotFoundException(
        `User with ID ${payload.userId} is not part of this project`,
      );
    }

    return await this.prisma.assigned.create({
      data: {
        todoId: payload.todoId,
        userId: payload.userId,
      },
    });
  }
}
