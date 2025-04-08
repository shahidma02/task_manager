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
import { CreateProjectDTO } from './dto/createProjectDto';
import { addUserDTO } from './dto/addUserDTO';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Company, Role } from '@prisma/client';
import { ProjectInterceptor } from 'src/common/interceptor/project.interceptor';
import { UpdateCompanyDTO } from 'src/company/dto/updateCompanyDTO';
import { UpdateProjectDTO } from './updateProjectDto';
import { ProjectBodyInterceptor } from 'src/common/interceptor/projectBody.interceptor';
import { AtGuard } from 'src/auth/common/guards/at.guard';

@UseGuards(RolesGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @Roles(Role.ADMIN)
  @Post('/create')
  async create(@Req() req, @Body() createProjectDTO: CreateProjectDTO) {
    try {
      const userId = req.user.sub;
      return await this.projectService.create(userId, createProjectDTO);
    } catch (error) {
      handleError(error, 'Error creating project');
    }
  }

  @Roles(Role.ADMIN)
  @Get()
  async findAll(companyId: number) {
    try {
      return await this.projectService.findAll(companyId);
    } catch (error) {
      handleError(error, 'Error finding projects');
    }
  }

  @Roles(Role.ADMIN, Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Get('/:id')
  async findOne(@Param('id') id: string, @Body() payload: UpdateProjectDTO) {
    try {
      return await this.projectService.findOne(Number(id), payload);
    } catch (error) {
      handleError(error, 'Error finding this project');
    }
  }

  @Roles(Role.ADMIN, Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Patch('/:id')
  async updateProject(
    @Param('id') id: number,
    @Body() createProjectDto: CreateProjectDTO,
  ) {
    try {
      return await this.projectService.updateProject(id, createProjectDto);
    } catch (error) {
      handleError(error, 'Error updating the project');
    }
  }

  @Roles(Role.ADMIN, Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Delete('/:id')
  async remove(@Param('id') id: number, @Body() payload: UpdateProjectDTO) {
    try {
      return await this.projectService.remove(id);
    } catch (error) {
      handleError(error, 'Error deleting project');
    }
  }

  @Roles(Role.ADMIN)
  @UseInterceptors(ProjectBodyInterceptor)
  @Post('/add-user')
  async addUser(@Body() payload: addUserDTO) {
    try {
      return await this.projectService.addUser(payload);
    } catch (error) {
      handleError(error, 'Error adding user to the project');
    }
  }
}
