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



}
