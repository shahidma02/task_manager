import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from 'src/users/dto/createUserDTO';
import { SignupResponse } from 'src/users/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }

  async getTokens(userId: number, email: string) {
    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 60 * 24,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);
    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signup(payload: CreateUserDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: { email: payload.email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already in use', {
        cause: new Error(),
        description: 'A user with this email already exists',
      });
    }

    const hash = await this.hashData(payload.password.toString());
    const newUser = await this.prisma.user.create({
      data: {
        ...payload,
        password: hash,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.email);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashRT: hash,
      },
    });
  }

  async signIn(email: string, pass: string): Promise<{ access_token: string }> {
    console.log('Received email:', email);
    console.log('Received password:', pass);
    const user = await this.prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const isPasswordValid = await bcrypt.compare(pass, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async logoutLocal(userId: number) {
    return await this.prisma.user.update({
      where: {
        id: userId,
        hashRT: {
          not: null,
        },
      },
      data: {
        hashRT: null,
      },
    });
  }

  async refreshLocal(userId: number, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    console.log('user ', user);
    if (!user || !user.hashRT) throw new ForbiddenException('Access Denied');

    const rtMatches = await bcrypt.compare(rt, user.hashRT);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.email);
    await this.updateRtHash(user.id, tokens.refresh_token);

    return tokens;
  }
}
