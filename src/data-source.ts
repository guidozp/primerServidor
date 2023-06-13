import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from './entity/User'

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "curso.ckwyilra0qmn.us-east-2.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "curso1234",
    database: "",
    synchronize: true,
    logging: false,
    entities: [User],
    migrations: [],
    subscribers: [],
})