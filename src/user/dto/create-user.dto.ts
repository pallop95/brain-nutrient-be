// src/user/dto/create-user.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class CreateUserDto {
  // @IsNotEmpty()
  // username: string;

  @IsEmail()
  @ApiProperty({ example: 'pallop.bunnak@gmail.com' })
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty({ example: '123456' })
  password: string;
}
