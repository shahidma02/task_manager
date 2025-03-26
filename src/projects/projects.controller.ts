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
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDTO } from './createProjectDto';
import { addUserDTO } from './addUserDTO';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/roles.decorator';
import { Company, Role } from '@prisma/client';
import { ProjectInterceptor } from 'src/common/interceptor/project.inceptor';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectService: ProjectsService) {}

  @UseGuards(AuthGuard,RolesGuard)
  @Roles(Role.ADMIN)
  @Post('/create')  
  async create(@Req() req, @Body() createProjectDTO: CreateProjectDTO) {
    const userId = req.user.sub;
    return await this.projectService.create(userId, createProjectDTO);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  @Get()
  async findAll(companyId:number) {
    return await this.projectService.findAll(companyId);
  }

  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.ADMIN,Role.MEMBER)
  @UseInterceptors(ProjectInterceptor)
  @Get('/:id')
  async findOne(@Param('id') id: string, companyId:number) {
    return await this.projectService.findOne(Number(id),companyId);
  }

  @Patch('/:id')
  async updateProject(
    @Param('id') id: number,
    @Body() createProjectDto: CreateProjectDTO,
  ) {
    return await this.projectService.updateProject(id, createProjectDto);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number) {
    return await this.projectService.remove(id);
  }

  @Post('/add-user')
  // @UseGuards(AuthGuard)
  @Public()
  async addUser(@Body() payload: addUserDTO) {
    return await this.projectService.addUser(payload);
  }
}
