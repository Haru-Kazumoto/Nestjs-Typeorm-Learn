import { UserService } from 'src/modules/user/user.service';
import { ForbiddenException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { User } from '../user/user.entity';
import * as bcrypt from "bcrypt";
import { Request } from 'express';
import { AuthRequest } from './auth.dto';
import { Transactional } from 'typeorm-transactional';
import { UserRepository } from '../user/user.repository';
import { comparePassword } from 'src/utils/password.utils';
import { RoleRepository } from '../role/role.repository';
import { DataNotFoundException } from 'src/exceptions/data_not_found.exception';
import { SessionData } from 'express-session';

@Injectable()
export class AuthService implements IAuthService { 
    constructor(
        @Inject('USER_SERVICE') private userService: UserService,
        @Inject('USER_REPOSITORY') private readonly userRepsitory: UserRepository,
        @Inject('ROLE_REPOSITORY') private readonly roleRepository: RoleRepository
    ){}

    public async validateUser(username: string, password: string): Promise<any> {
        const user: User = await this.userService.findByUsername(username);
        const isPasswordMatch: boolean = await comparePassword(password, user.password);

        if(user && isPasswordMatch){
            const {password, ...rest} = user;
            return rest;
        }

        throw new ForbiddenException();
    }

    public async login(request: Request): Promise<any> {
        return {
            message: `Hello, ${request.body.username}`,
            statusCode: HttpStatus.OK
        };
    }

    public async logout(request: Request): Promise<any> {
        request.session.destroy(() => {
            return {
                message: "Logout success",
                statusCode: HttpStatus.OK
            };
        });
    }

    @Transactional()
    public async register(request: AuthRequest): Promise<any> {
        await this.userService.checkIfFieldExists('username', request.username, "Username already exists");
        await this.userService.checkIfFieldExists('email', request.email, "Email already exists");

        const role = await this.roleRepository.findRoleById(request.role_id);

        if(!role) throw new DataNotFoundException("Role id not found.", 400);

        const createUser = this.userRepsitory.create({
            ...request,
            role: role,
            password: await bcrypt.hash(request.password, 10),
        });

        await this.userRepsitory.save(createUser); //ini ada error nih.
    }
}
