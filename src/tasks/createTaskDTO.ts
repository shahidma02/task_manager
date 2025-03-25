import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateTaskDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsInt()
  projectId: number;
}
