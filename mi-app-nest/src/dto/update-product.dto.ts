import { IsBoolean, IsNotEmpty } from "class-validator";
import { CreateProductDTO } from "./create-product.dto";

export class UpdateProductDTO extends CreateProductDTO {
    @IsNotEmpty()
    @IsBoolean()
    status: boolean;
}