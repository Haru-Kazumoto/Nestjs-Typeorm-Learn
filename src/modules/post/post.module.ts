import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { PostService }  from './post.service';
import { PostRepository } from './post.repository';
import { PostController } from './post.controller';
import { User } from 'test';
import { ResponseHttp } from 'src/utils/response.http.utils';

@Module({
    imports: [
        TypeOrmModule.forFeature([Post,User])
    ],
    providers: [
        PostService,
        PostRepository,
        ResponseHttp
    ],
    controllers: [PostController]
})
export class PostModule {}
