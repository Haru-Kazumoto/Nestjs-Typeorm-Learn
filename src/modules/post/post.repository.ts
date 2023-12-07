import { DataSource, Repository } from "typeorm";
import { Post } from "./post.entity";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class PostRepository extends Repository<Post>{
    @InjectRepository(Post) postRepository: Repository<Post>

    constructor(public dataSource: DataSource){
        super(Post, dataSource.createEntityManager());
    }

    public async findAllPostByUserId(userId: number): Promise<Post[]>{
        return this.createQueryBuilder('post')
            .where('post.user_id = :userId', {userId: userId})
            .getMany();
    }

}