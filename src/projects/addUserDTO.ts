import {
  IsInt,
  IsNotEmpty,
} from 'class-validator';

export class addUserDTO {
  @IsNotEmpty()
  @IsInt()
  userId: number;

  @IsNotEmpty()
  @IsInt()
  projectId: number;
}
