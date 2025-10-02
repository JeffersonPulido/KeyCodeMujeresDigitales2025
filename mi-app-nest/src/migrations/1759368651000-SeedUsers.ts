import { MigrationInterface, QueryRunner } from "typeorm";

export class SeedUsers1759368651000 implements MigrationInterface {
    name = 'SeedUsers1759368651000'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      INSERT INTO user (name, email, password, age) VALUES
      ('Ana López', 'ana@example.com', '12345', 25),
      ('Luis Gómez', 'luis@example.com', '12345', 30)
    `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
                  DELETE FROM user WHERE email IN ('ana@example.com', 'luis@example.com')
            `)
    }
}