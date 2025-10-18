import { IsBoolean, IsInt, IsNotEmpty, IsOptional } from "class-validator";
import { CreateProductDTO } from "./create-product.dto";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateProductDTO {
    @ApiProperty({ example: 'Botas', description: 'Nombre del producto', required: false })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'Botas negras de seguridad', description: 'Descripcion del producto', required: false })
    @IsOptional()
    description?: string;

    @ApiProperty({ example: '30000', description: 'Precio del producto', required: false })
    @IsOptional()
    @IsInt()
    price?: number;

    @ApiProperty({ example: '10', description: 'Inventario del producto', required: false })
    @IsOptional()
    @IsInt()
    stock?: number;

    @ApiProperty({ example: 'true', description: 'Estado del producto', required: false })
    @IsOptional()
    @IsBoolean()
    status?: boolean;
}