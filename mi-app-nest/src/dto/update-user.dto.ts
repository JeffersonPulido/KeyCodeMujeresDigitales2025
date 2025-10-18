
import * as userEntity from "src/entities/user.entity";
import { CreateUserDTO } from "./create-user.dto";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, Length, Max, Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class UpdateUserDTO {
    @ApiProperty({ example: 'admin', description: 'Rol del usuario', required: false })
    @IsNotEmpty()
    role: userEntity.Roles;

    @ApiProperty({ example: 'Jefferson Pulido', description: 'Nombre completo del usuario', required: false })
    @IsOptional()
    name?: string;

    @ApiProperty({ example: 'jp@gmail.com', description: 'Email valido del usuario', required: false })
    @IsOptional()
    @IsEmail()
    email?: string;

    @ApiProperty({ example: '123456', description: 'Contraseña minima de 6 caracteres y maximo 10', required: false })
    @IsOptional()
    @Length(6, 10, { message: "La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10" })
    password?: string;

    @ApiProperty({ example: '23', description: 'Edad del usuario' })
    @IsOptional()
    @IsInt()
    @Min(18, { message: "La edad debe ser mayor o igual a 18" })
    @Max(100, { message: "Sea realista" })
    age?: number;
}