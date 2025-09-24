import { IsEmail, IsInt, IsNotEmpty, IsOptional, MaxLength, Min, MinLength } from "class-validator";

export class CreateUserDTO {
    @IsNotEmpty()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(10)
    password: string;

    @IsOptional()
    @IsInt()
    @Min(0,{ message: "La edad debe ser mayor o igual a 0" })
    age?: number;
}