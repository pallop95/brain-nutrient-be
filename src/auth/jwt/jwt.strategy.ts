import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
// import { Strategy } from 'passport-local';
// import { AuthService } from '../auth.service';
import { User } from 'src/user/user.entity';
import { ConfigService } from '@nestjs/config';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserService } from 'src/user/user.service';
import { CustomJwtPayload } from '../types/customJwtPayload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    // private authService: AuthService,
    private userService: UserService,
    configService: ConfigService,
  ) {
    // super({
    //   usernameField: 'email',
    // });
    console.log('hello...');
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  // async validate(email: string, password: string): Promise<User> {
  //   const user = await this.authService.validateUser(email, password);
  //   if (!user) {
  //     throw new UnauthorizedException();
  //   }
  //   return user;
  // }
  async validate(payload: CustomJwtPayload): Promise<User> {
    // console.log('payload :: ', payload);
    const { email } = payload;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
