import { Roles } from "src/entities/user.entity";

export type IUser = {
    id: number,
    name?: string,
    email?: string,
    password?: string,
    age?: number,
    role: Roles,
}