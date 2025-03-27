import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaService } from 'src/prisma.service';
import { ROLES_KEY } from './roles.decorator';
import { Role } from '@prisma/client';

@Injectable()
export class RolesParamGuard implements CanActivate {
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

    // console.log(requiredRoles)

    const request = context.switchToHttp().getRequest();
    const user = request.user;
    // console.log('User',user)
    // const body = request.body ?? {};
    // console.log('Body:', body);

    const param = request.params?.id;
    // console.log('Param:', param);

    let companyId = Number(param);
    // console.log('Company ID:', companyId);

    if (!user) {
      throw new ForbiddenException('User not authenticated');
    }

    if (!companyId) {
      throw new ForbiddenException('Company ID is required');
    }

    // const companyId = body.companyId;

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
