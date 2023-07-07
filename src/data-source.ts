import "reflect-metadata"
import { DataSource } from "typeorm"
import {User} from './entity/User'
import { Receipt } from "./entity/Receipt"
import { Item } from "./entity/Item"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "curso.ckwyilra0qmn.us-east-2.rds.amazonaws.com",
    port: 5432,
    username: "postgres",
    password: "curso1234",
    database: "",
    synchronize: true,
    logging: false,
    entities: [User,Receipt,Item],
    migrations: [],
    subscribers: [],
})