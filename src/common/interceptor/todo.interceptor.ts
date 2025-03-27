import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TodoInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const taskId = Number(request.body.taskId);
    const userId = request.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const task = await this.prisma.task.findFirst({
      where: { id: taskId },
      select: { projectId: true },
    });

    const projectId = task?.projectId ?? undefined;

    const isMember = await this.prisma.project_User_Co.findFirst({
      where: {
        userId: userId,
        projectId: projectId,
      },
    });

    console.log('is a part', isMember);
    if (!isMember) {
      throw new UnauthorizedException('User is not part of this project');
    }

    return next.handle();
  }
}
