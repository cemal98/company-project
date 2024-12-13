import { MigrationInterface, QueryRunner } from "typeorm";
import { v4 as uuidv4 } from "uuid";
import moment from "moment";

export class CreateCompanyAndProduct1734128555173 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const mongoManager = queryRunner.connection.mongoManager;

    // Rastgele bir tarih üretmek için yardımcı fonksiyon
    const getRandomDate = (start: Date, end: Date): Date => {
      return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    };

    // Şirket oluşturma
    const companies = Array.from({ length: 30 }).map((_, index) => {
      const createdAt = getRandomDate(new Date(2023, 0, 1), new Date()); // Rastgele bir oluşturulma tarihi
      return {
        id: uuidv4(),
        name: `Company ${index + 1}`,
        legalNumber: (Math.random() * 1000000000).toFixed(0), // Rastgele bir yasal numara
        incorporationCountry: ["Turkey", "USA", "Germany"][index % 3], // Döngüsel olarak ülke atama
        website: `https://company${index + 1}.com`,
        createdAt: createdAt.toISOString(), // Rastgele oluşturulma tarihi
        deletedAt: null, // Başlangıçta null
      };
    });

    const products = [];
    for (let company of companies) {
      const companyCreatedAt = moment(company.createdAt);
      const productStartDate = companyCreatedAt.clone().add(1, "day"); // Ürünler, şirketin oluşturulma tarihinden sonra başlar
      const productEndDate = moment(); // Bugün

      // Her şirket için rastgele sayıda ürün oluştur (5 ila 10 arasında)
      const numberOfProducts = Math.floor(Math.random() * 6) + 5; // 5 ila 10 arasında ürün
      for (let i = 0; i < numberOfProducts; i++) {
        const randomDate = getRandomDate(productStartDate.toDate(), productEndDate.toDate());
        products.push({
          id: uuidv4(),
          name: `Product ${Math.floor(Math.random() * 100)}`,
          category: "Category A",
          amount: Math.floor(Math.random() * 1000) + 1,
          amountUnit: "kg",
          companyId: company.id,
          date: randomDate.toISOString(), // Rastgele tarih
          deletedAt: null, // Başlangıçta null
        });
      }
    }

    // Companies ve Products koleksiyonlarına verileri ekle
    await mongoManager.insertMany("companies", companies);
    await mongoManager.insertMany("products", products);

    console.log("30 Companies and their Products data have been inserted with correct dates.");
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const mongoManager = queryRunner.connection.mongoManager;

    // Companies ve Products koleksiyonlarını temizle
    await mongoManager.deleteMany("products", {});
    await mongoManager.deleteMany("companies", {});

    console.log("Companies and Products data have been deleted.");
  }
}
