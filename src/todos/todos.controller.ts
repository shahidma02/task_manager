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
import { TodosService } from './todos.service';
import { CreateTodoDTO } from './createTodoDTO';
import { assignTodoDTO } from './assignTodoDTO';
import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateTodoDTO } from './updateTodoDto';
import { TodoInterceptor } from 'src/common/interceptor/todo.interceptor';

@UseGuards(AuthGuard)
@UseInterceptors(TodoInterceptor)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/create')
  async create(@Body() createTodoDTO: CreateTodoDTO) {
    return await this.todosService.create(createTodoDTO);
  }

  @Get()
  async findAll(@Body() todo: UpdateTodoDTO) {
    return await this.todosService.findAll(Number(todo.taskId));
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    return await this.todosService.findOne(Number(id));
  }

  @Patch('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDTO: UpdateTodoDTO,
  ) {
    return await this.todosService.updateTodo(Number(id), updateTodoDTO);
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    return await this.todosService.remove(Number(id));
  }

  @Post('/assign')
  async assignTodo(@Body() assignTodoDTO: assignTodoDTO) {
    return await this.todosService.assignTodo(assignTodoDTO);
  }
}
