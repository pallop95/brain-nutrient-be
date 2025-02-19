import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AccessToken } from './types/accessToken';

@Controller('auth')
@ApiTags('AuthController')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Public decorator allows access without authentication
  @Post('login')
  // @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: AccessToken })
  async login(@Body() loginDto: LoginDto): Promise<AccessToken> {
    return this.authService.login(loginDto);
  }
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.email, signInDto.password);
  // }

  @Public() // Public decorator allows access without authentication
  @Post('register')
  // @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: HttpStatus.OK, type: AccessToken })
  async register(@Body() loginDto: LoginDto): Promise<AccessToken> {
    return this.authService.register(loginDto);
  }

  @Public()
  @Post('refresh-token')
  @ApiResponse({ status: HttpStatus.OK, type: AccessToken })
  async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<AccessToken> {
    return this.authService.refreshToken(refreshTokenDto);
  }

  // @Post('logout')
  // @UseGuards(AuthGuard)
  // async logout() {
  //   // You can add custom logic for logging out, such as invalidating tokens
  //   // This endpoint is protected and requires JWT authentication
  //   return { message: 'Logged out successfully' };
  // }
}
