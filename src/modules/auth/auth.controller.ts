import { Controller, Get, HttpCode, HttpException, HttpStatus, Inject, Post, Req, Request, Session, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { AuthenticatedGuard } from '../guards/authenticated.guard';
import { LocalGuard } from '../guards/localguard.guard';
import { AuthService } from './auth.service';
import { Request as ExpressRequest} from 'express';
import { Session as ExpressSession } from "express-session";

@Controller('auth')
export class AuthController {

    constructor(
        @Inject('AUTH_SERVICE') private readonly authService: AuthService
    ){}

    @UseGuards(LocalGuard)
    @Post('login')
    login(@Session() session: ExpressSession){
        console.log({session});
        return this.authService.login(session);
    }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    async logout(@Req() request: ExpressRequest){
        const isLogoutError = await new Promise((resolve) => {
            request.logOut({keepSessionInfo: false}, (error: Error) => {
                resolve(error)
            })
        });

        if(isLogoutError){
            console.error(isLogoutError);
            throw new HttpException("Cannot logout due to error", 400);
        };

        return this.authService.logout(request);
    }

    @UseGuards(AuthenticatedGuard)
    @HttpCode(HttpStatus.OK)
    @Get('hello')
    hello(): string{
        return "Yey, u've already authenticated by passport session authentication!";
    }
}
