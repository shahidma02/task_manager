import {
  Body,
  Controller,
  Post,
  UseGuards,
  Req,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './createProjectDto';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Post('/create')
  @UseGuards(AuthGuard)
  async create(@Req() req, @Body() createProjectDTO: CreateProjectDTO) {
    const userId = req.user.id;
    return await this.projectService.create(userId, createProjectDTO);
  }

  @Get()
  async findAll() {
    return await this.projectService.findAll();
  }

  @Get('/:id')
  async findOne(@Param('id') id: number) {
    return await this.projectService.findOne(id);
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: number,
    @Body() createProjectDto: CreateProjectDTO,
  ) {
    return await this.projectService.updateProject(id, createProjectDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.projectService.remove(id);
  }
}
