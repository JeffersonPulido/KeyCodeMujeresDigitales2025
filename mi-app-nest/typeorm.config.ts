import * as dotenv from 'dotenv'
import { DataSource } from 'typeorm'
import { User } from './src/entities/user.entity'

dotenv.config()

export default new DataSource({
    type: 'mysql',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    entities: [User],
    migrations: ['./src/migrations/*.ts']
});