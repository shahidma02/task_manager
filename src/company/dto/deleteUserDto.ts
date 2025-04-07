import { IsInt, IsArray, IsEnum, ArrayNotEmpty } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class DeleteUserDto {
  @IsInt()
  userId: number;

  @IsInt()
  companyId: number;
}

