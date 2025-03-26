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
  import { TodosService } from './todos.service';
  import { CreateTodoDTO } from './createTodoDTO';
  import { assignTodoDTO } from './assignTodoDTO';
  import { AuthGuard } from 'src/auth/auth.guard';
  
  @Controller('todos')
  export class TodosController {
    constructor(private readonly todosService: TodosService) {}
  
    @Post('/create')
    @UseGuards(AuthGuard)
    async create(@Body() createTodoDTO: CreateTodoDTO) {
      return await this.todosService.create(createTodoDTO);
    }
  
    @Get()
    async findAll() {
      return await this.todosService.findAll();
    }
  
    @Get('/:id')
    async findOne(@Param('id') id: string) {
      return await this.todosService.findOne(Number(id));
    }
  
    @Patch('/:id')
    async updateTodo(@Param('id') id: string, @Body() createTodoDTO: CreateTodoDTO) {
      return await this.todosService.updateTodo(Number(id), createTodoDTO);
    }
  
    @Delete('/:id')
    async remove(@Param('id') id: string) {
      return await this.todosService.remove(Number(id));
    }
  
    @Post('/assign')
    @UseGuards(AuthGuard)
    async assignTodo(@Body() assignTodoDTO: assignTodoDTO) {
      return await this.todosService.assignTodo(assignTodoDTO);
    }
  }
  