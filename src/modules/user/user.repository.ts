import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'test';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class UserRepository extends Repository<User>{
    @InjectRepository(User) postRepository: Repository<User>

    constructor(public dataSource: DataSource){
        super(User, dataSource.createEntityManager());
    }



}
