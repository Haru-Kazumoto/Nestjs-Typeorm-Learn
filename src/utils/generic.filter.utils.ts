import { Transform } from "class-transformer";
import { IsEnum, IsNumber, IsOptional } from "class-validator";
import { SortOrder } from "src/enums/sort.enums";

export class PaginateFilter {

    @IsNumber({},{message: "page attribute should be a number."})
    public page: number;
    
    @IsNumber({},{message: "pageSize attribute should be a number"})
    public pageSize: number;

    @IsOptional()
    public orderBy?: number;

    @IsOptional()
    @IsEnum(SortOrder)
    public sortOrder?: SortOrder = SortOrder.ASC;
}