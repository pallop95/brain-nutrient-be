// src/user/dto/user.dto.ts

export class UserDto {
  id: number;
  username: string;
  email: string;
  isActive: boolean;
  avatarUrl?: string; // Optional field
  createdAt: Date;
  updatedAt: Date;
}
