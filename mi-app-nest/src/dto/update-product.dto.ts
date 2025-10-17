import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { CreateProductDTO } from "./create-product.dto";

export class UpdateProductDTO {
    @IsOptional()
    name?: string;

    @IsOptional()
    description?: string;

    @IsOptional()
    @IsInt()
    price?: number;

    @IsOptional()
    @IsInt()
    stock?: number;

    @IsOptional()
    @IsBoolean()
    status?: boolean;
}