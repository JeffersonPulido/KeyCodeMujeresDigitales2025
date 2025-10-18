import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString, Length, Max, Min } from "class-validator";
import * as userEntity from 'src/entities/user.entity';

export class CreateUserDTO {
    @ApiProperty({ example: 'Jefferson Pulido', description: 'Nombre completo del usuario' })
    @IsNotEmpty()
    name: string;

    @ApiProperty({ example: 'jp@gmail.com', description: 'Email valido del usuario' })
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty({ example: '123456', description: 'Contraseña minima de 6 caracteres y maximo 10' })
    @IsNotEmpty()
    @Length(6, 10, { message: "La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10" })
    password: string;

    @ApiProperty({ example: '23', description: 'Edad del usuario' })
    @IsOptional()
    @IsInt()
    @Min(18, { message: "La edad debe ser mayor o igual a 18" })
    @Max(100, { message: "Sea realista" })
    age?: number;

    @ApiProperty({ example: 'admin', description: 'Rol del usuario', required: false })
    @IsOptional()
    @IsString()
    role?: userEntity.Roles;
}