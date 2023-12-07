import { IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class PostCreateDto {

    @IsNotEmpty()
    @IsString()
    public title: string;

    @IsNotEmpty()
    @IsString()
    public content: string;

    @IsNotEmpty()
    @IsNumber()
    public user_id: number;
}