import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService }  from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { ResponseHttp } from 'src/utils/response.http.utils';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post,User])
  ],
    providers: [
        {
            provide: 'POST_SERVICE',
            useClass: PostService
        },
        {
            provide: 'POST_REPOSITORY',
            useClass: PostRepository
        },
        {
            provide: 'USER_REPOSITORY',
            useClass: UserRepository
        },
        {
            provide: 'RESPONSE_HTTP',
            useClass: ResponseHttp
        },
    ],
    controllers: [PostController]
})
export class PostModule {}
