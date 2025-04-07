import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
  IsEnum,
} from 'class-validator';

export class UpdateTodoDTO {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsInt()
  @IsPositive()
  taskId?: number;

  @IsOptional()
  @IsEnum(['PENDING', 'INPROGRESS', 'COMPLETED'])
  status?: 'PENDING' | 'INPROGRESS' | 'COMPLETED';

  @IsOptional()
  @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';

  @IsOptional()
  @IsInt()
  @IsPositive()
  duration?: number;
}
