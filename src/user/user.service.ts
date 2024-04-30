// src/user/services/user.service.ts

import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository, // Repository<User>,
  ) {}

  async findOneByEmail(email: string) {
    this.logger.log('findOneByEmail :: ', email);
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    this.logger.log('createUser :: ', JSON.stringify(createUserDto));
    const { email, password } = createUserDto;

    // // Check if a user with the same email already exists
    // const existingUser = await this.findOneByEmail(createUserDto.email);
    // if (existingUser) {
    //   throw new Error('User with this email already exists');
    // }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user entity and save it to the database
    const newUser = this.userRepository.create({
      // username,
      email,
      password: hashedPassword,
      isActive: true, // You can set default values here
    });
    return await this.userRepository.save(newUser);
  }

  async getUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async updateUser(email: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.getUserByEmail(email);

    // Update user properties based on DTO
    // if (updateUserDto.username) {
    //   user.username = updateUserDto.username;
    // }
    if (updateUserDto.email) {
      user.email = updateUserDto.email;
    }
    if (updateUserDto.password) {
      const hashedPassword = await bcrypt.hash(updateUserDto.password, 10);
      user.password = hashedPassword;
    }

    return await this.userRepository.save(user);
  }

  async deleteUser(email: string): Promise<void> {
    const user = await this.getUserByEmail(email);
    await this.userRepository.remove(user);
  }
}
