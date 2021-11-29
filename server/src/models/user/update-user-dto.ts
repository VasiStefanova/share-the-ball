import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class UpdateUserDTO {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(4, 40)
  password?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @Length(4, 40)
  newPassword?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  latitude?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumberString()
  longitude?: string;
}
