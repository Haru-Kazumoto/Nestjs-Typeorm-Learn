import { Module } from '@nestjs/common';
import { UserModule } from './modules/user/user.module';
import { DatabaseModule } from './config/database.module';
import { ResponseHttp } from './utils/response.http.utils';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './modules/post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(
      {
        envFilePath: '.env',
        isGlobal: true
      }
    ),
    UserModule,
    DatabaseModule,
    PostModule
  ],
  providers: [
    ResponseHttp
  ],
})
export class AppModule {
  
}
