import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    @ApiProperty({ example: 'Botas', description: 'Nombre del producto' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'Botas negras de seguridad', description: 'Descripcion del producto' })
    @IsNotEmpty()
    description: string;

    @ApiProperty({ example: '30000', description: 'Precio del producto' })
    @IsNotEmpty()
    @IsInt()
    price: number;

    @ApiProperty({ example: '10', description: 'Inventario del producto' })
    @IsNotEmpty()
    @IsInt()
    stock: number;
}