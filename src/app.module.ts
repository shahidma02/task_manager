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
import { InvitesModule } from './invites/invites.module';
import { AtGuard } from './auth/common/gurads';

@Module({
  imports: [
    UsersModule,
    CompanyModule,
    AuthModule,
    ProjectsModule,
    TasksModule,
    TodosModule,
    CommentsModule,
    InvitesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AtGuard,
    },
  ],
})
export class AppModule {}
