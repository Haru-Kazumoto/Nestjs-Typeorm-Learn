import { Inject, Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserCreateDto } from './dto/user.dto';
import { DuplicateDataException } from '../../exception/duplicate_data.exception';
import * as bcrypt from "bcrypt";
import { IUserService } from './user.service.interface';
import { IPaginationOptions, IPaginationMeta } from 'nestjs-typeorm-paginate/dist/interfaces';
import { Pagination, paginate } from 'nestjs-typeorm-paginate';
import { Transactional } from 'typeorm-transactional/dist/decorators/transactional';
import { DataNotFoundException } from '../../exception/data_not_found.exception';
import { UserRepository } from './user.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService{

    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepository: UserRepository
        // @InjectRepository(User) private readonly userRepository: Repository<User>
    ){}
    
    @Transactional()
    public async create(body: UserCreateDto): Promise<User> {

        await this.checkIfFieldExists('username', body.username, "Username already exists");
        await this.checkIfFieldExists('email', body.email, "Email already exists");

        const createInstance = this.userRepository.create({
            ...body,
            password: await bcrypt.hash(body.password, 10)
        });

        return this.userRepository.save(createInstance);
    }

    public async index(option: IPaginationOptions<IPaginationMeta>): Promise<Pagination<User>> {
        const queryBuilder = this.userRepository.createQueryBuilder('user')
            .leftJoinAndSelect('user.posts', 'posts')
            .orderBy('user.id', 'ASC');

        return await paginate<User>(queryBuilder, option);
    }

    @Transactional()
    public async update(id: number, body: UserCreateDto): Promise<User> {
        const user = await this.userRepository.findOne({where: {id: id}});
        if(!user) throw new DataNotFoundException("Id user not found", 404);

        await this.checkIfFieldExists('username', body.username, "Username already exists");
        await this.checkIfFieldExists('email', body.email, "Email already exists");

        user.username = body.username;
        user.email = body.email;
        user.password = await bcrypt.hash(body.password, 10);

        Object.assign(user, body);

        return await this.userRepository.save(user);
    }

    public async delete(id: number) {
        const data = await this.userRepository.findOne({where: {id: id}});
        if(!data) throw new DataNotFoundException("ID not found", 404);
        
        await this.userRepository.remove(data);
    }

    public async findByUsername(username: string): Promise<User> {
        const user:User = await this.userRepository.findUserByUsername(username);

        if(!user) throw new DataNotFoundException("Username not found",400);

        return user;
    }

    public async findById(id: number): Promise<User> {
        return await this.userRepository.findById(id).then(
            () => { throw new DataNotFoundException("Id not found.", 400) }
        );
    }

    // Utils method

    public async checkIfFieldExists(field: string, value: string, errorMessage: string): Promise<void>{
        const data = await this.userRepository.findOne({where: { [field]: value }});
        if(data){
            throw new DuplicateDataException(errorMessage, 400);
        }
    }

    public async checkIfFieldNotExists(field: string, value: any, errorMessage: string): Promise<void>{
        const data = await this.userRepository.findOne({where: { [field]: value}});
        if(data){
            throw new DataNotFoundException(errorMessage, 404);
        }
    }    
}
