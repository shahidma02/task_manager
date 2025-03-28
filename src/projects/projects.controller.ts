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
  UseInterceptors,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.decorator';
// import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './createProjectDto';
import { addUserDTO } from './addUserDTO';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Company, Role } from '@prisma/client';
import { ProjectInterceptor } from 'src/common/interceptor/project.interceptor';
import { UpdateCompanyDTO } from 'src/company/updateCompanyDTO';
import { UpdateProjectDTO } from './updateProjectDto';
import { ProjectBodyInterceptor } from 'src/common/interceptor/projectBody.interceptor';
import { AtGuard } from 'src/auth/common/guards/at.guard';

@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')
  async create(@Req() req, @Body() createProjectDTO: CreateProjectDTO) {
    const userId = req.user.sub;
    return await this.projectService.create(userId, createProjectDTO);
  }

  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(companyId: number) {
    return await this.projectService.findAll(companyId);
  }

  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Get('/:id')
  async findOne(@Param('id') id: string, @Body() payload: UpdateProjectDTO) {
    console.log('in findone projects');
    return await this.projectService.findOne(Number(id), payload);
  }

  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Patch('/:id')
  async updateProject(
    @Param('id') id: number,
    @Body() createProjectDto: CreateProjectDTO,
  ) {
    return await this.projectService.updateProject(id, createProjectDto);
  }

  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Delete('/:id')
  async remove(@Param('id') id: number, @Body() payload: UpdateProjectDTO) {
    return await this.projectService.remove(id);
  }

  @UseGuards(AtGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @UseInterceptors(ProjectBodyInterceptor)
  @Post('/add-user')
  async addUser(@Body() payload: addUserDTO) {
    console.log('hiiiii');
    return await this.projectService.addUser(payload);
  }
}
