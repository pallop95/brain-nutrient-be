import { Body, Controller, HttpStatus } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from './dto/login.dto';
import { RefreshTokenDto } from './dto/refresh-token.dto';

@Controller('auth')
export class AuthController {
  // constructor(private readonly authService: AuthService) {}

  // @Public() // Public decorator allows access without authentication
  // @Post('login')
  // @HttpCode(HttpStatus.OK)
  // async login(@Body() loginDto: LoginDto) {
  //   return this.authService.login(loginDto);
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
