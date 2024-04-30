import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // Make the config module global
      envFilePath: ['.env'], // Load environment variables from .env file
    }),
  ],
})
export class ConfigModule {}
