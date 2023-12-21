import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { ResponseHttp } from 'src/utils/response.http.utils';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User])
  ],
  controllers: [UserController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UserService
    },
    {
      provide: 'RESPONSE_HTTP',
      useClass: ResponseHttp
    },
    {
      provide: 'USER_REPOSITORY',
      useClass: UserRepository
    }
  ]
})
export class UserModule {}
