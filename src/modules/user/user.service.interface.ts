import { IPaginationOptions, Pagination } from "nestjs-typeorm-paginate";
import { UserCreateDto } from "./dto/user.dto";
import { User } from "./user.entity";

export interface IUserService {
    create(body: UserCreateDto): User | Promise<User> | any;
    index(option: IPaginationOptions): Promise<Pagination<User>>;
    update(id: number, body: UserCreateDto): Promise<User>;
    delete(id: number): any;
}