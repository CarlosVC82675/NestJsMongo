import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({
  whitelist: true,               // Remove propriedades que não estão no DTO
  forbidNonWhitelisted: true,    // Dispara erro se propriedades extras forem enviadas
  transform: true,               // Converte tipos automaticamente (ex: string para number)
  }));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
