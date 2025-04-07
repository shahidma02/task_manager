import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProjectMiddleware implements NestMiddleware {
  constructor(private readonly prisma: PrismaService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    next();
    // try {
    //   const projectId = Number(req.params.id);
    //   const userId = req.user?.sub;

    //   if (!userId) {
    //     throw new UnauthorizedException('User not authenticated');
    //   }

    //   const isMember = await this.prisma.project_User_Co.findFirst({
    //     where: {
    //       projectId: projectId,
    //       userId: userId,
    //     },
    //   });

    //   if (!isMember) {
    //     throw new UnauthorizedException('User is not part of this project');
    //   }

    //   next();
    // } catch (error) {
    //   next(error);
    // }
  }
}
