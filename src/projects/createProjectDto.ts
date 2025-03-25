import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateProjectDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  // @IsOptional()
  // @IsInt()
  // @IsPositive()
  // durationInDays: number;
}
