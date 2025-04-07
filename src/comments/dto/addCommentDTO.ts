import { IsInt, IsString, MinLength, MaxLength } from 'class-validator';

export class AddCommentDTO {
  @IsInt()
  todoId: number;

  @IsString()
  @MinLength(1)
  text: string;

  // @IsInt()
  // userId: number;
}
