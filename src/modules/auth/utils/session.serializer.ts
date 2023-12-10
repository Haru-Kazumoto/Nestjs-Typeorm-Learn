import { Inject } from "@nestjs/common";
import { PassportSerializer } from "@nestjs/passport";
import { User } from "src/modules/user/user.entity";
import { UserService } from "src/modules/user/user.service";

export class SessionSerializer extends PassportSerializer {
    constructor(
        @Inject('USER_SERVICE') private userService: UserService
    ){
        super();
    }

    serializeUser(user: User, done: (err: Error, user: User) => void) {
        done(null, user);
    }

    async deserializeUser(payload: User, done: (err: Error, user: User) => void) {
        const userDB = await this.userService.findById(payload.id);

        return userDB ? done(null, userDB) : done(null, null);
    }
}