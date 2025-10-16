
import * as userEntity from "src/entities/user.entity";
import { CreateUserDTO } from "./create-user.dto";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";

export class UpdateUserDTO {
    @IsNotEmpty()
    role: userEntity.Roles;

    @IsOptional()
    name?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @Length(6, 10, { message: "La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10" })
    password?: string;

    @IsOptional()
    @IsInt()
    @Min(18, { message: "La edad debe ser mayor o igual a 18" })
    @Max(100, { message: "Sea realista" })
    age?: number;
}