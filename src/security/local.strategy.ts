import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../modules/auth/auth.service";
import { AuthRequest } from "../modules/interfaces/auth.request.interface";
import { RoleRepository } from "src/modules/role/role.repository";
import { User } from "src/modules/user/user.entity";
import { Roles } from "src/modules/role/roles.entity";
import { DataNotFoundException } from "src/exception/data_not_found.exception";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('AUTH_SERVICE') private authService: AuthService,
        @Inject('ROLE_REPOSITORY') private readonly roleRepository: RoleRepository
    ){
        super({
            usernameField: 'username'
        });
    }

    async validate(username: string, password: string):  Promise<any>{
        const user = await this.authService.validateUser(username, password);
        if(!user) {
            throw new UnauthorizedException("Username or password isn't valid.");
        }
        return user;
    }

    async findRole(roleName: string): Promise<Roles>{
        const role = await this.roleRepository.findRoleByName(roleName);
        if(!role) throw new DataNotFoundException("Role not found.", 400);

        return role;
    }
}