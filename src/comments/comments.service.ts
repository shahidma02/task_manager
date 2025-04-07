import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddCommentDTO } from './dto/addCommentDTO';

@Injectable()
export class CommentsService {
  constructor(private readonly prisma: PrismaService) {}

  async addComment(userId, payload: AddCommentDTO) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: payload.todoId },
      include: { task: { include: { project: true } } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${payload.todoId} not found`);
    }

    const userProject = await this.prisma.project_User_Co.findFirst({
      where: {
        userId: userId,
        projectId: todo.task.project.id,
      },
    });

    if (!userProject) {
      throw new ForbiddenException(`User is not part of the project`);
    }
    return await this.prisma.comment.create({
      data: {
        text: payload.text,
        todoId: payload.todoId,
        userId: userId,
      },
    });
  }

  async getComments(userId, todoId: number) {
    const todo = await this.prisma.todo.findUnique({
      where: { id: todoId },
      include: { task: { include: { project: true } } },
    });

    if (!todo) {
      throw new NotFoundException(`Todo with ID ${todoId} not found`);
    }

    const userProject = await this.prisma.project_User_Co.findFirst({
      where: {
        userId: userId,
        projectId: todo.task.project.id,
      },
    });

    if (!userProject) {
      throw new ForbiddenException(`User is not part of the project`);
    }

    return await this.prisma.comment.findMany({
      where: { todoId },
      include: { user: { select: { id: true, name: true, email: true } } },
    });
  }

  //   async deleteComment(id:number) {
  //     const comment = await this.prisma.comment.findUnique({
  //       where: { id: payload.commentId }
  //     });

  //     if (!comment) {
  //       throw new NotFoundException(`Comment with ID ${payload.commentId} not found`);
  //     }

  //     if (comment.userId !== payload.userId) {
  //       throw new ForbiddenException(`You can only delete your own comments`);
  //     }

  //     return await this.prisma.comment.delete({
  //       where: { id: payload.commentId }
  //     });
  //   }
}
