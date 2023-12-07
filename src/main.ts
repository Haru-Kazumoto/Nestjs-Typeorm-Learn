import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import { initializeTransactionalContext } from 'typeorm-transactional/dist/common';
import { ValidationPipe } from '@nestjs/common/pipes';

async function bootstrap() {
  dotenv.config(); //Env config
  initializeTransactionalContext(); //Transactional context

  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: 'http://localhost:8080',
      credentials: true
    }
  });

  app.setGlobalPrefix(`/api/v${process.env.APP_VERSION}`);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  
  await app.listen(process.env.APP_PORT);
  
  Logger.log(`Nest running on port ${process.env.APP_PORT}`, "Application")
}

bootstrap();