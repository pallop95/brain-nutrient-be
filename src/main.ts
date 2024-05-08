import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { resolve } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS with specific options
  app.enableCors({
    origin: 'http://localhost:4200', // Allow requests from this origin
    credentials: true, // Allow sending cookies from frontend to backend
  });

  const options = new DocumentBuilder()
    .setTitle('Brain Nutrient API')
    .setDescription('API documentation for Brain Nutrient project')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('localhost:3000')
    // .setBasePath('localhost:3000')
    .build();
  // TODO: can't pass 'Bearer <Token>', check later...
  const document = SwaggerModule.createDocument(app, options);

  // Save the Swagger JSON document to a file
  const filePath = resolve(__dirname, '../openAPI/swagger.json');
  try {
    console.log(__dirname);
    writeFileSync(filePath, JSON.stringify(document, null, 2));
    console.log('Swagger JSON file generated successfully.');
  } catch (error) {
    console.error('Error writing Swagger JSON file:', error);
  }

  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
