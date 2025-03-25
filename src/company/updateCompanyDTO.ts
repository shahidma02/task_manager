import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCompanyDTO{
    @IsOptional()
    @IsString()
    name?:string    
}