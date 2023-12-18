import { UserService } from 'src/modules/user/user.service';
import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { IAuthService } from './auth.service.interface';
import { User } from '../user/user.entity';
import * as bcrypt from "bcrypt";
import { BadCredentialException } from 'src/exception/bad_credential.exception';
import { Request } from 'express';
import { Session } from 'express-session';

@Injectable()
export class AuthService implements IAuthService { 
    constructor(@Inject('USER_SERVICE') private userService: UserService){}

    public async validateUser(username: string, password: string): Promise<any> {
        const user: User = await this.userService.findByUsername(username);
        const isPasswordMatch: boolean = await this.comparePassword(password, user.password);

        if(user && isPasswordMatch){
            const {username, password, ...rest} = user;
            return rest;
        }

        throw new BadCredentialException();
    }

    public async login(session: Session): Promise<any> {
        return {
            message: `Hello, ${session}`,
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

    public async comparePassword(password: string, hashedPassword: string): Promise<boolean>{
        return await bcrypt.compare(password, hashedPassword);
    }
}
