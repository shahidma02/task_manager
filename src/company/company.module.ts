import { Module } from '@nestjs/common';
import { CompanyController } from './company.controller';
import { CompanyService } from './company.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from 'src/auth/auth.guard';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService,PrismaService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ]

})
export class CompanyModule {}
