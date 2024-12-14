import { DataSource } from "typeorm";
import dotenv from "dotenv";
import path from "path";
import { Company } from "./entities/Company";
import { Product } from "./entities/Product";
import { User } from "./entities/User";

dotenv.config();

export const AppDataSource = new DataSource({
  type: "mongodb",
  database: "CompanyProject",
  url: process.env.DATABASE_URL,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  entities: [Company, Product, User],
  migrations: [path.join(__dirname, "./migrations/*.ts")],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization", err);
  });
