import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const options = new DocumentBuilder()
    .setTitle('Brain Nutrient API')
    .setDescription('API documentation for Brain Nutrient project')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  // TODO: can't pass 'Bearer <Token>', check later...
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
