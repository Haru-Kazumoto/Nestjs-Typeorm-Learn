import { Controller, Get, Post, Request, Session, UseGuards } from '@nestjs/common';
import { get } from 'http';
import { AuthenticatedGuard } from './guards/authenticated.guard';

@Controller('auth')
export class AuthController {

    constructor(){}

    @UseGuards()
    @Post('login')
    async login(@Request() req){

    }

    @Get('get-session')
    async getSession(@Session() session: Record<string, any>){
        session.authenticated = true;
        return session;
    }

    @UseGuards(AuthenticatedGuard)
    @Get('hello')
    hellO(): string{
        return "fuck you";
    }

}
