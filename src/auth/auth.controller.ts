import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
// import { LoginDto } from './dto/login.dto';
import { Public } from 'src/decorator/public.decorator';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public() // Public decorator allows access without authentication
  @Post('login')
  @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: LoginDto) {
  //   return this.authService.login(loginDto);
  // }
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  // signIn(@Body() signInDto: Record<string, any>) {
  //   return this.authService.signIn(signInDto.email, signInDto.password);
  // }

  // @Public()
  // @Post('refresh-token')
  // async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
  //   return this.authService.refreshToken(refreshTokenDto);
  // }

  // @Post('logout')
  // @UseGuards(AuthGuard)
  // async logout() {
  //   // You can add custom logic for logging out, such as invalidating tokens
  //   // This endpoint is protected and requires JWT authentication
  //   return { message: 'Logged out successfully' };
  // }
}
