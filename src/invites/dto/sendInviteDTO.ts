import {
  IsDate,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SendInviteDto {
  @IsNotEmpty()
  @IsInt()
  companyId: number;

  @IsNotEmpty()
  @IsInt()
  sentTo: number;

  @IsOptional()
  @IsEnum(['ACCEPTED', 'UNACCEPTED'])
  status?: 'ACCEPTED' | 'UNACCEPTED';
}
