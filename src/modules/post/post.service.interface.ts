import { PostCreateDto } from "./dto/post.dto";
import { Post } from "./post.entity";

export interface IPostService {
    create(dto: PostCreateDto): Promise<Post>;
    index(userId: number): Promise<Post[]>;
    update(id: number, dto: PostCreateDto): Promise<Post>;
    delete(id: number): void;
}