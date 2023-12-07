import { PostRepository } from './post.repository';
import { Injectable } from '@nestjs/common';
import { IPostService } from './post.service.interface';
import { PostCreateDto } from './dto/post.dto';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'test';
import { DataNotFoundException } from 'src/exception/data_not_found.exception';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class PostService implements IPostService{

    constructor(
        private readonly postRepository: PostRepository,
        @InjectRepository(User) private readonly userRepository: Repository<User>
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
