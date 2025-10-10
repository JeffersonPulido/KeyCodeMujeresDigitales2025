import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export type Roles = 'admin' | 'user'

export enum RolesEnum {
    ADMIN = 'admin',
    USER = 'user'
}

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false, unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ nullable: true })
    age?: number

    @Column({ default: RolesEnum.USER })
    role: Roles;
}