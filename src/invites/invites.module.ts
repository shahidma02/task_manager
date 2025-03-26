import { Module } from '@nestjs/common';
import { InvitesController } from './invites.controller';
import { InvitesService } from './invites.service';
import { PrismaService } from 'src/prisma.service';
import { RolesGuard } from 'src/roles/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { UsersService } from 'src/users/users.service';

@Module({
  controllers: [InvitesController],
  providers: [
    InvitesService,
    PrismaService,
    AuthService,
    UsersService,
    // {
    //   provide: APP_GUARD,
    //   useClass: AuthModule,
    // },
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class InvitesModule {}
