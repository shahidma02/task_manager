import { IsInt, IsArray, IsEnum, ArrayNotEmpty } from 'class-validator';
import { Role } from 'src/roles/role.enum';

export class UserCompanyDto {
  @IsInt()
  userId: number;

  @IsInt()
  companyId: number;

  @IsArray()
  @IsEnum(Role, { each: true })
  @ArrayNotEmpty()
  role: Role;
}
