import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/user.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "syednokhaizhaider",
  password: "1234",
  database: "node-ts",
  synchronize: true,
  logging: false,
  entities: [User],
  migrations: [],
  subscribers: [],
});
