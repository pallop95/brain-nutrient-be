import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    const newUser = await this.userService.createUser(createUserDto);
    return this.mapToDto(newUser);
  }

  @Get(':email')
  async getUserByEmail(@Param('email') email: string): Promise<UserDto> {
    const user = await this.userService.getUserByEmail(email);
    return this.mapToDto(user);
  }

  @Patch(':email')
  async updateUser(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const updatedUser = await this.userService.updateUser(email, updateUserDto);
    return this.mapToDto(updatedUser);
  }

  @Delete(':email')
  async deleteUser(@Param('email') email: string): Promise<void> {
    await this.userService.deleteUser(email);
  }

  private mapToDto(user: any): UserDto {
    const { id, username, email, isActive, avatarUrl, createdAt, updatedAt } =
      user;
    return {
      id,
      username,
      email,
      isActive,
      avatarUrl,
      createdAt,
      updatedAt,
    };
  }
}
