import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CompanyModule } from './company/company.module';
import { AuthModule } from './auth/auth.module';

import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ProjectsModule } from './projects/projects.module';
import { TasksModule } from './tasks/tasks.module';
import { TodosModule } from './todos/todos.module';
import { CommentsModule } from './comments/comments.module';


@Module({
  imports: [UsersModule, CompanyModule, AuthModule, ProjectsModule, TasksModule, TodosModule, CommentsModule],
  controllers: [AppController],
  providers: [AppService,
  //   {
  //     provide: APP_GUARD,
  //     useClass: AuthGuard,
  // },
  ],
})
export class AppModule {}
