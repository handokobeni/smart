import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as admin from 'firebase-admin';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Add helmet middleware for security headers
  app.use(helmet());
  
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  }));
  
  // Penting: tambahkan prefix 'api' untuk serverless function
  app.setGlobalPrefix('api');
  
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('Your API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  admin.initializeApp();

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();

// Tambahkan ini untuk support Vercel
export default async function handler(req, res) {
  const app = await NestFactory.create(AppModule);
  await app.init();
  const instance = app.getHttpAdapter().getInstance();
  return instance(req, res);
}
