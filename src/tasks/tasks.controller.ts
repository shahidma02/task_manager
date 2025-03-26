import {
    Body,
    Controller,
    Post,
    Get,
    Param,
    Patch,
    Delete,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { TasksService } from './tasks.service';
  import { CreateTaskDTO } from './createTaskDTO';
  import { AuthGuard } from 'src/auth/auth.guard';
  
  @Controller('tasks')
  export class TasksController {
    constructor(private readonly tasksService: TasksService) {}
  
    @Post('/create')
    @UseGuards(AuthGuard)
    async create(@Req() req, @Body() createTaskDTO: CreateTaskDTO) {
      const userId = req.user.id; // If tasks belong to a user
      return await this.tasksService.create(createTaskDTO);
    }
  
    @Get()
    async findAll() {
      return await this.tasksService.findAll();
    }
  
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.tasksService.findOne(Number(id));
    }
  
    @Patch('/:id')
    async updateTask(@Param('id') id: string, @Body() createTaskDTO: CreateTaskDTO) {
      return await this.tasksService.updateTask(Number(id), createTaskDTO);
    }
  
    @Delete('/:id')
    async remove(@Param('id') id: string) {
      return await this.tasksService.remove(Number(id));
    }
  }
  