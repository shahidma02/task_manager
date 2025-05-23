import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { PrismaService } from 'src/prisma.service';
import { APP_GUARD } from '@nestjs/core';
// import { AuthGuard } from './auth.guard';
import { AtStrategy, RtStrategy } from './strategies';

@Module({
  // imports: [
  //   UsersModule,
  //   JwtModule.register({
  //     global: true,
  //     secret: jwtConstants.secret,
  //     signOptions: { expiresIn: '60d' },
  //   }),
  // ],
  imports: [UsersModule, JwtModule.register({})],
  providers: [
    AuthService,
    PrismaService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthGuard,
    // },
    AtStrategy,
    RtStrategy,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
