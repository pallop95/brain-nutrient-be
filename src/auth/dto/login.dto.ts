// src/auth/dto/login.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'pallop.bunnak@gmail.com' })
  email: string;

  @IsNotEmpty()
  @ApiProperty({ example: '123456' })
  password: string;
}
