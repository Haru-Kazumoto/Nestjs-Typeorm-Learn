import { Body, Controller, Post } from '@nestjs/common';
import { PostService } from './post.service';
import { PostCreateDto } from './dto/post.dto';
import { ResponseHttp } from 'src/utils/response.http.utils';
import { HttpStatus } from '@nestjs/common/enums';
import { Get, Put, Query, Res } from '@nestjs/common/decorators';
import { Response } from 'express';
import { ParseIntPipe } from '@nestjs/common/pipes';

@Controller('post')
export class PostController {

    constructor(
        private postService: PostService,
        private response: ResponseHttp
    ){}

    @Post('create')
    async createPost(@Body() dto: PostCreateDto, @Res() response: Response){
        const res = await this.response.createResponse(
            HttpStatus.OK,
            await this.postService.create(dto)
        );

        return this.response.sendResponse(
            response,
            res
        );
    }

    @Get('get')
    async getAllPostByUserId(@Query('user_id', ParseIntPipe) userId: number, @Res() response: Response){
        const res = await this.response.createResponse(
            HttpStatus.OK,
            await this.postService.index(userId)
        );

        return this.response.sendResponse(
            response, 
            res
        );
    }
    
    @Put('update')
    async updateById(@Query('post_id', ParseIntPipe) postId: number, @Res() response: Response){

    }
    
}
