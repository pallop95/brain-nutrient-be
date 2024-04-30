import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { JwtService } from './jwt/jwt.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { LocalStrategy } from './jwt/local.strategy';
import { JwtStrategy } from './jwt/jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { UserRepository } from 'src/user/user.repository';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: '1d',
          // expiresIn: parseInt(
          //   configService.getOrThrow<string>(
          //     'ACCESS_TOKEN_VALIDITY_DURATION_IN_SEC',
          //   ),
          // ),
        }, // Adjust expiration time as needed
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    JwtService,
    AuthService,
    LocalStrategy,
    JwtStrategy,
    UserService,
    UserRepository,
  ],
})
export class AuthModule {}
