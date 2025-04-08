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
  UseInterceptors,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO } from './dto/createTaskDTO';
import { ProjectBodyInterceptor } from 'src/common/interceptor/projectBody.interceptor';
import { ProjectInterceptor } from 'src/common/interceptor/project.interceptor';
import { AtGuard } from 'src/auth/common/guards';

@UseInterceptors(ProjectBodyInterceptor)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // @UseInterceptors(ProjectBodyInterceptor)
  @Post('/create')
  async create(@Req() req, @Body() createTaskDTO: CreateTaskDTO) {
    try {
      const userId = req.user.id;
      return await this.tasksService.create(createTaskDTO);
    } catch (error) {
      handleError(error, 'Error creating task');
    }
  }

  // @UseInterceptors(ProjectBodyInterceptor)
  @Get()
  async findAll(@Body() projectId) {
    try {
      return await this.tasksService.findAll(projectId);
    } catch (error) {
      handleError(error, 'Error finding task');
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string) {
    try {
      return await this.tasksService.findOne(Number(id));
    } catch (error) {
      handleError(error, `Error finding task ${id}`);
    }
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() createTaskDTO: CreateTaskDTO,
  ) {
    try {
      return await this.tasksService.updateTask(Number(id), createTaskDTO);
    } catch (error) {
      handleError(error, `Error updating task ${id}`);
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      return await this.tasksService.remove(Number(id));
    } catch (error) {
      handleError(error, `Error deleting task ${id}`);
    }
  }
}
