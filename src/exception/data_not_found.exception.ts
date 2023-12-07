import { HttpException, HttpStatus } from "@nestjs/common";

export class DataNotFoundException extends HttpException{
    constructor(message: string, status: HttpStatus){
        super(message,status)
    };
};