import { PostRepository } from './post.repository';
import { Inject, Injectable } from '@nestjs/common';
import { IPostService } from './post.service.interface';
import { PostCreateDto } from './dto/post.dto';
import { Post } from './post.entity';
import { DataNotFoundException } from '../../exception/data_not_found.exception';
import { Transactional } from 'typeorm-transactional';
import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@Injectable()
export class PostService implements IPostService{

    constructor(
        @Inject('POST_REPOSITORY') private readonly postRepository: PostRepository,
        @Inject('USER_REPOSITORY') private readonly userRepository: UserRepository
    ){}

    @Transactional()
    public async create(body: PostCreateDto): Promise<Post> {
        const user: User = await this.userRepository.findOne({where: {id: body.user_id}});
        if(!user) throw new DataNotFoundException("User id not found", 400);

        const postInstance = this.postRepository.create({
            ...body,
            user: user
        });

        return await this.postRepository.save(postInstance);
    }

    public async index(userId: number): Promise<Post[]> {
        const user = await this.userRepository.findOne({where: { id : userId}});
        if(!user) throw new DataNotFoundException("User id not found", 400);

        return await this.postRepository.findAllPostByUserId(userId);
        // return null;
    }

    @Transactional()
    public async update(id: number, dto: PostCreateDto): Promise<Post> {
        const existingData = await this.postRepository.findOne({where: {id: id }});
        return null;
    }

    delete(id: number): void {
        throw new Error('Method not implemented.');
    }

}
