import { IsEmail, Length } from "class-validator";

export class LoginDTO {
    @IsEmail()
    email: string;

    @Length(6, 10, { message: "La contraseña debe tener una longitud de minimo 6 caracteres y maximo 10" })
    password: string;
}