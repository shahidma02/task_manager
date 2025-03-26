import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { Request } from 'express';
import { IS_PUBLIC_KEY } from 'src/auth/auth.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('In auth guard')
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    
    console.log(`Route is public: ${isPublic}`);
    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    console.log('User in AuthGuard:', request.user)
    const token = this.extractTokenFromHeader(request);
    console.log(token);
    if (!token) {
      console.log('throuwing 401');
      throw new UnauthorizedException();
    }
    try {
      console.log('Trying');
      const payload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
      console.log('payloadd:', payload);
      request['user'] = payload;
      // request.user = payload
    } catch {
      console.log('not verified');
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    console.log('Extracting');
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
