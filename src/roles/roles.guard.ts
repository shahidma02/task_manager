import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
// import { Role } from './role.enum';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    const body = request.body;

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!body.companyId) {
      throw new ForbiddenException('Company ID is required');
    }

    const companyId = body.companyId;

    const userCompanyRole = await this.prisma.user_Company.findFirst({
      where: { userId: user.sub, companyId },
      select: { role: true },
    });
    console.log('Role:::', userCompanyRole);
    if (!userCompanyRole) {
      throw new ForbiddenException('User does not belong to this company');
    }

    return requiredRoles.includes(userCompanyRole.role);
  }
}
