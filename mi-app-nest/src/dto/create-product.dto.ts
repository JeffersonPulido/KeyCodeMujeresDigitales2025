import { IsInt, IsNotEmpty } from "class-validator";

export class CreateProductDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    description: string;

    @IsNotEmpty()
    @IsInt()
    price: number;
}