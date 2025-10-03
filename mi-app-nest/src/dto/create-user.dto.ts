import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;
    
    @IsNotEmpty()
    @IsEmail()
    email: string;
    
    @IsNotEmpty()
    @Length(6, 10, { message: "La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10" })
    password: string;

    @IsOptional()
    @IsInt()
    @Min(18, { message: "La edad debe ser mayor o igual a 18" })
    @Max(100, { message: "Sea realista" })
    age?: number;
}