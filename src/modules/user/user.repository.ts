import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserRepository extends Repository<User>{
    @InjectRepository(User) userRepository: Repository<User>

    constructor(public dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }

    async findUserByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({
            where: {
                username: username
            }
        });
    }

    public async findById(id: number): Promise<User>{
        return await this.userRepository.findOne({
            where: {
                id: id
            }
        });
    }

}
