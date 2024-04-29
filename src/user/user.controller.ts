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

  @Get(':id')
  async getUserById(@Param('id') id: number): Promise<UserDto> {
    const user = await this.userService.getUserById(id);
    return this.mapToDto(user);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const updatedUser = await this.userService.updateUser(id, updateUserDto);
    return this.mapToDto(updatedUser);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    await this.userService.deleteUser(id);
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
