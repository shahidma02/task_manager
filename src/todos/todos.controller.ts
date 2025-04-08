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
import { CreateTodoDTO } from './dto/createTodoDTO';
import { assignTodoDTO } from './dto/assignTodoDTO';
// import { AuthGuard } from 'src/auth/auth.guard';
import { UpdateTodoDTO } from './dto/updateTodoDto';
import { TodoInterceptor } from 'src/common/interceptor/todo.interceptor';
import { AtGuard } from 'src/auth/common/guards/at.guard';

@UseInterceptors(TodoInterceptor)
@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Post('/create')
  async create(@Body() createTodoDTO: CreateTodoDTO) {
    try {
      return await this.todosService.create(createTodoDTO);
    } catch (error) {
      handleError(error, 'Error creating todo');
    }
  }

  @Get()
  async findAll(@Body() todo: UpdateTodoDTO) {
    try {
      return await this.todosService.findAll(Number(todo.taskId));
    } catch (error) {
      handleError(error, 'Error finidng todos');
    }
  }

  @Get('/:id')
  async findOne(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    try {
      return await this.todosService.findOne(Number(id));
    } catch (error) {
      handleError(error, `Error finding todo ${id}`);
    }
  }

  @Patch('/:id')
  async updateTodo(
    @Param('id') id: string,
    @Body() updateTodoDTO: UpdateTodoDTO,
  ) {
    try {
      return await this.todosService.updateTodo(Number(id), updateTodoDTO);
    } catch (error) {
      handleError(error, `Error updating todo ${id}`);
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string, @Body() todo: UpdateTodoDTO) {
    try {
      return await this.todosService.remove(Number(id));
    } catch (error) {
      handleError(error, `Error deleting todo ${id}`);
    }
  }

  @Post('/assign')
  async assignTodo(@Body() assignTodoDTO: assignTodoDTO) {
    try {
      return await this.todosService.assignTodo(assignTodoDTO);
    } catch (error) {
      handleError(error, `Error assigning todo`);
    }
  }
}
