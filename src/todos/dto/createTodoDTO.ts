import {
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsPositive,
    IsString,
    IsEnum,
  } from 'class-validator';
  
  export class CreateTodoDTO {
    
    @IsString()
    @IsNotEmpty()
    name: string;
  
    @IsInt()
    @IsPositive()
    taskId: number;
  
    @IsEnum(['PENDING', 'INPROGRESS', 'COMPLETED'])
    status: 'PENDING' | 'INPROGRESS' | 'COMPLETED';
  
    @IsEnum(['LOW', 'MEDIUM', 'HIGH'])
    priority: 'LOW' | 'MEDIUM' | 'HIGH';
  
    @IsInt()
    @IsPositive()
    duration: number;
  }
  