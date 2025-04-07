import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateTodoDTO } from './dto/createTodoDTO';
import { addDays } from 'date-fns';
import { assignTodoDTO } from './dto/assignTodoDTO';
import { UpdateTodoDTO } from './dto/updateTodoDto';
import { EventsGateway } from 'src/events/events.gateway';

@Injectable()
export class TodosService {
  constructor(
    private prisma: PrismaService,
    private eventsGateway: EventsGateway,
  ) {}

  async create(payload: CreateTodoDTO): Promise<any> {
    console.log('creating todo');
    const { duration, ...data } = payload;
    const dueDate = addDays(new Date(), duration);

    const todo = await this.prisma.todo.create({
      data: {
        ...data,
        due_at: dueDate,
      },
    });

    const project = await this.prisma.task.findUnique({
      where: { id: payload.taskId },
    });

    if (!project) {
      throw new Error(`Task with ID ${payload.taskId} not found.`);
    }

    // const projectUsers = await this.prisma.project_User_Co.findMany({
    //   where: { projectId: project.projectId },
    //   select: { userId: true },
    // });
    // console.log(projectUsers);
    // const userIds = projectUsers.map((user) => user.userId);
    // console.log(userIds);
    this.eventsGateway.sendMessage(todo);
    // this.eventsGateway.sendMessageToUsers(userIds, payload);
    return todo;
  }

  async findAll(taskId: number) {
    console.log('task is', taskId);
    return this.prisma.todo.findMany({
      where: { taskId: taskId },
    });
  }

  async findOne(id: number) {
    const todo = await this.prisma.todo.findUnique({ where: { id } });
    if (!todo) {
      throw new NotFoundException(`todo with ID ${id} not found`);
    }
    return todo;
  }

  async updateTodo(id: number, payload: UpdateTodoDTO): Promise<any> {
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
        `Users with ID ${payload.userId} is not part of this project`,
      );
    }

    let assign = await this.prisma.assigned.create({
      data: {
        todoId: payload.todoId,
        userId: payload.userId,
      },
    });

    this.eventsGateway.sendMessage(assign);

    return assign;
  }
}
