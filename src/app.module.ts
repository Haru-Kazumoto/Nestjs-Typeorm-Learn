import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './config/database.module';
import { ResponseHttp } from './utils/response.http.utils';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';
import { LoggingMiddleware } from './middleware/logging.middleware';
import { AuthModule } from './modules/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    PassportModule.register({
      session: true,
    }),
    UserModule,
    DatabaseModule,
    PostModule,
    AuthModule
  ],
  providers: [
    ResponseHttp
  ],
})
export class AppModule implements NestModule{
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes('*');
    }
}
