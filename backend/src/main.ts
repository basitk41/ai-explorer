import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Bootstrap the NestJS application
 * - Configure CORS for frontend access
 * - Set up validation pipes
 * - Start HTTP server on port 3000
 */
async function bootstrap() {
  // Create NestJS application instance
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend access
  app.enableCors({
    origin: '*', // In production, restrict this to specific domains
    allowedHeaders: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });
  
  // Enable validation using class-validator decorators
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true, // Strip properties not defined in DTOs
    transform: true, // Transform payloads to DTO instances
    forbidNonWhitelisted: true, // Throw errors for non-whitelisted properties
  }));
  
  // Start HTTP server
  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
