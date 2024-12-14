import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export class CreateCompanyAndProduct1734128555173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mongoManager = queryRunner.connection.mongoManager;

    const getRandomDate = (start: Date, end: Date): Date => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    const companies = Array.from({ length: 30 }).map((_, index) => {
      const createdAt = getRandomDate(new Date(2023, 0, 1), new Date());
      return {
        id: uuidv4(),
        name: `Company ${index + 1}`,
        legalNumber: (Math.random() * 1000000000).toFixed(0),
        incorporationCountry: ["Turkey", "USA", "Germany"][index % 3],
        website: `https://company${index + 1}.com`,
        createdAt: createdAt.toISOString(),
        deletedAt: null,
      };
    });

    const products = [];
    for (let company of companies) {
      const companyCreatedAt = moment(company.createdAt);
      const productStartDate = companyCreatedAt.clone().add(1, "day");
      const productEndDate = moment();

      const numberOfProducts = Math.floor(Math.random() * 6) + 5;
      for (let i = 0; i < numberOfProducts; i++) {
        const randomDate = getRandomDate(productStartDate.toDate(), productEndDate.toDate());
        products.push({
          id: uuidv4(),
          name: `Product ${Math.floor(Math.random() * 100)}`,
          category: "Category A",
          amount: Math.floor(Math.random() * 1000) + 1,
          amountUnit: "kg",
          companyId: company.id,
          date: randomDate.toISOString(),
          deletedAt: null,
        });
      }
    }

    await mongoManager.insertMany("companies", companies);
    await mongoManager.insertMany("products", products);

    console.log("30 Companies and their Products data have been inserted with correct dates.");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const mongoManager = queryRunner.connection.mongoManager;

    await mongoManager.deleteMany("products", {});
    await mongoManager.deleteMany("companies", {});

    console.log("Companies and Products data have been deleted.");
  }
}
