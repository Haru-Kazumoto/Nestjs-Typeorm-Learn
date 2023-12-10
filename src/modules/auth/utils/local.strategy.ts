import { Inject } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";

export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(
        
    ){
        super();
    }
}