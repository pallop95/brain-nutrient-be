// src/auth/dto/reset-password.dto.ts

import { IsNotEmpty, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @IsNotEmpty()
  resetPasswordToken: string;

  @IsNotEmpty()
  @MinLength(6)
  newPassword: string;
}
