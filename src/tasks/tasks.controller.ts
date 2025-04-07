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
// import { AuthGuard } from 'src/auth/auth.guard';
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
    const userId = req.user.id;
    return await this.tasksService.create(createTaskDTO);
  }

  // @UseInterceptors(ProjectBodyInterceptor)
  @Get()
  async findAll(@Body() projectId) {
    return await this.tasksService.findAll(projectId);
  }

  // authorize
  @Get('/:id')
  async findOne(@Param('id') id: string) {
    return await this.tasksService.findOne(Number(id));
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() createTaskDTO: CreateTaskDTO,
  ) {
    return await this.tasksService.updateTask(Number(id), createTaskDTO);
  }

  //authorize
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.tasksService.remove(Number(id));
  }
}
