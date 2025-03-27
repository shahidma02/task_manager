import { IsInt, IsNotEmpty, IsPositive } from 'class-validator';

export class assignTodoDTO {
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  todoId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  userId: number;

  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  taskId: number;
}
