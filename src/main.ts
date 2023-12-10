import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";
import { initializeTransactionalContext } from 'typeorm-transactional/dist/common';
import { ValidationPipe } from '@nestjs/common/pipes';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  dotenv.config(); //Env config
  initializeTransactionalContext(); //Transactional context

  const time = 24 * 60 * 60; // 1 day in seconds
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
  app.use(
    session(
      {
        name: process.env.COOKIE_NAME,
        secret: process.env.COOKIE_SECRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
          maxAge: time * 1000
        }
      }
    )
  );
  app.use(passport.initialize());
  app.use(passport.session())
  
  await app.listen(process.env.APP_PORT);
  
  Logger.log(`Nest running on port ${process.env.APP_PORT}`, "Application")
}

bootstrap();