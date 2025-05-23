import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUserDTO';
import { SignupResponse } from './user';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'src/prisma.service';
import { UpdateUserDto } from './dto/updateUserDTO';
@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // async signup(payload: CreateUserDto): Promise<SignupResponse> {
  //   const existingUser = await this.prisma.user.findFirst({
  //     where: { email: payload.email },
  //   });

  //   if (existingUser) {
  //     throw new BadRequestException('Email already in use', {
  //       cause: new Error(),
  //       description: 'A user with this email already exists',
  //     });
  //   }

  //   const hash = await bcrypt.hash(payload.password.toString(), 10);
  //   payload.password = hash;
  //   return await this.prisma.user.create({
  //     data: payload,
  //   });
  // }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    console.log('Received ID:', id);
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async updateUser(
    id: number,
    payload: UpdateUserDto,
  ): Promise<SignupResponse> {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    if (payload.password) {
      const hash = await bcrypt.hash(payload.password.toString(), 10);
      payload.password = hash;
    }

    return await this.prisma.user.update({
      data: payload,
      where: { id },
    });
  }

  async remove(id: number) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return this.prisma.user.delete({ where: { id } });
  }
}
