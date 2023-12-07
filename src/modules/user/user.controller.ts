import { 
    Body, 
    Controller, 
    Get, 
    HttpStatus, 
    Post, 
    Res, 
    UsePipes, 
    ValidationPipe, 
    Query, 
    ParseIntPipe,
    Req,
    DefaultValuePipe,
    Put,
    Delete
} from '@nestjs/common';
import { UserCreateDto } from './dto/user.dto';
import { UserService } from './user.service';
import { Request, Response } from 'express';
import { ResponseHttp } from 'src/utils/response.http.utils';
import { User } from './user.entity';
import { Pagination } from 'nestjs-typeorm-paginate/dist/pagination';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

@Controller('user')
export class UserController {

    constructor(
        private readonly userService: UserService,
        private readonly response: ResponseHttp
    ){}

    @Post('create')
    @UsePipes(new ValidationPipe({transform: true}))
    public async createUser(@Body() dto: UserCreateDto, @Res() res: Response){
        const data = await this.userService.create(dto);
        const response = this.response.createResponse(HttpStatus.OK,data);

        return this.response.sendResponse(res, response);
    }

    @Get('index')
    public async index(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('size', new DefaultValuePipe(5), ParseIntPipe) limit: number,
        @Req() request: Request
    ): Promise<Pagination<User>>{
        const options: IPaginationOptions = {
            limit: limit, 
            page: page, 
            route: request.url
        };

        return await this.userService.index(options);
    }

    @Put('update')
    public async updateUser(@Query('id', ParseIntPipe) id: number,@Body() dto: UserCreateDto,@Res() res: Response){
        const instance = await this.userService.update(id, dto);
        const response = this.response.createResponse(HttpStatus.OK, instance);

        return this.response.sendResponse(res, response);
    }

    @Delete('delete')
    public async deleteUser(@Query('id', ParseIntPipe) id: number){
        await this.userService.delete(id);
    }
} 
