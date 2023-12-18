import { Request } from "express";
import { Session } from "express-session";

export interface IAuthService {
    validateUser(username: string, password: string): Promise<any>;
    login(session: Session): Promise<any>;
    logout(request: Request): Promise<any>;
}
