import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { AccessToken } from './types/accessToken';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { CustomJwtPayload } from './types/customJwtPayload';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user: User = await this.userService.findOneByEmail(email);
    if (!user) {
      throw new BadRequestException('User not found');
    }
    const isMatch: boolean = bcrypt.compareSync(password, user.password);
    if (!isMatch) {
      throw new BadRequestException('Password does not match');
    }
    return user;
  }

  async login(loginDto: LoginDto): Promise<AccessToken> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) throw new BadRequestException('SOmething went wrong');

    const payload: CustomJwtPayload = { email: user.email, id: user.id };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(createUser: CreateUserDto): Promise<AccessToken> {
    const existingUser = this.userService.findOneByEmail(createUser.email);
    if (existingUser) {
      throw new BadRequestException('email already exists');
    }
    const hashedPassword = await bcrypt.hash(createUser.password, 10);
    const newUser: CreateUserDto = { ...createUser, password: hashedPassword };
    const user = await this.userService.createUser(newUser);
    return this.login(user);
  }

  async refreshToken(refreshTokenDto: RefreshTokenDto): Promise<AccessToken> {
    const { refreshToken } = refreshTokenDto;
    // TODO: Verify if the refresh token is valid (e.g., check against stored tokens in database)

    try {
      const decoded = this.jwtService.verify(refreshToken);
      const user = await this.userService.findOneByEmail(decoded.email);

      if (!user) throw new BadRequestException('User not found');

      const payload: CustomJwtPayload = { email: user.email, id: user.id };
      const accessToken = this.jwtService.sign(payload);

      return { access_token: accessToken };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
}
