import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { PrismaService } from 'src/prisma.service';
import { EventsModule } from 'src/events/events.module';

@Module({
  imports:[EventsModule],
  controllers: [TodosController],
  providers: [TodosService, PrismaService],
})
export class TodosModule {}
