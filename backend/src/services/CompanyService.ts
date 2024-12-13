import { Service } from "typedi";
import { MongoRepository } from "typeorm/repository/MongoRepository";
import { Company } from "../entities/Company";
import { AppDataSource } from "../database";

@Service()
export class CompanyService {
  private repository: MongoRepository<Company>;

  constructor() {
    this.repository = AppDataSource.getMongoRepository(Company);
  }

}
