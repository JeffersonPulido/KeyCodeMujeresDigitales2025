
import * as userEntity from "src/entities/user.entity";
import { CreateUserDTO } from "./create-user.dto";
import { IsNotEmpty } from "class-validator";

export class UpdateUserDTO extends CreateUserDTO {
    @IsNotEmpty()
    role: userEntity.Roles;
}