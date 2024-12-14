import { Service } from "typedi";
import { MongoRepository } from "typeorm/repository/MongoRepository";
import { AppDataSource } from "../database";
import { Product } from "../entities/Product";

@Service()
export class ProductService {
  private repository: MongoRepository<Product>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Product);
  }

}
