import { IsEmail, MaxLength, MinLength } from "class-validator";

export class LoginDTO {
    @IsEmail()
    email: string;

    @MinLength(6)
    @MaxLength(10)
    password: string;
}