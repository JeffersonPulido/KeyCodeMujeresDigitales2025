import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    description: string;

    @Column({ nullable: false })
    price: number;

    @Column({ nullable: false })
    stock: number;

    @Column({ nullable: false, default: true })
    status: boolean;
}