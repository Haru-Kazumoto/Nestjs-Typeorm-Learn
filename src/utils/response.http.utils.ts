import { Injectable } from "@nestjs/common";
import { Response } from "express";
import { ResponseInterface } from "src/interfaces/response.interface";

@Injectable()
export class ResponseHttp{

    public createResponse(statusCode: number, data?: any): any{
        const response: ResponseInterface = {
            statusCode,
            data
        }

        return response;
    }

    public sendResponse(response: Response, body: ResponseInterface): void{
        response.status(body.statusCode).json(body);
    }
}