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
export class ProjectInterceptor implements NestInterceptor {
  constructor(private readonly prisma: PrismaService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const request = context.switchToHttp().getRequest();

    const projectId = Number(request.params.id);
    const userId = request.user?.sub;

    if (!userId) {
      throw new UnauthorizedException('User not authenticated');
    }

    const isMember = await this.prisma.project_User_Co.findFirst({
      where: {
        projectId: projectId,
        userId: userId,
      },
    });
    console.log('is a part', isMember);
    if (!isMember) {
      throw new UnauthorizedException('User is not part of this project');
    }

    return next.handle();
  }
}
