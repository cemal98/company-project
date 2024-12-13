"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCompanyAndProduct1734128555173 = void 0;
const uuid_1 = require("uuid");
const moment_1 = __importDefault(require("moment"));
class CreateCompanyAndProduct1734128555173 {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoManager = queryRunner.connection.mongoManager;
            // Rastgele bir tarih üretmek için yardımcı fonksiyon
            const getRandomDate = (start, end) => {
                return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            };
            // Şirket oluşturma
            const companies = Array.from({ length: 30 }).map((_, index) => {
                const createdAt = getRandomDate(new Date(2023, 0, 1), new Date()); // Rastgele bir oluşturulma tarihi
                return {
                    id: (0, uuid_1.v4)(),
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
                const companyCreatedAt = (0, moment_1.default)(company.createdAt);
                const productStartDate = companyCreatedAt.clone().add(1, "day"); // Ürünler, şirketin oluşturulma tarihinden sonra başlar
                const productEndDate = (0, moment_1.default)(); // Bugün
                // Her şirket için rastgele sayıda ürün oluştur (5 ila 10 arasında)
                const numberOfProducts = Math.floor(Math.random() * 6) + 5; // 5 ila 10 arasında ürün
                for (let i = 0; i < numberOfProducts; i++) {
                    const randomDate = getRandomDate(productStartDate.toDate(), productEndDate.toDate());
                    products.push({
                        id: (0, uuid_1.v4)(),
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
            yield mongoManager.insertMany("companies", companies);
            yield mongoManager.insertMany("products", products);
            console.log("30 Companies and their Products data have been inserted with correct dates.");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoManager = queryRunner.connection.mongoManager;
            // Companies ve Products koleksiyonlarını temizle
            yield mongoManager.deleteMany("products", {});
            yield mongoManager.deleteMany("companies", {});
            console.log("Companies and Products data have been deleted.");
        });
    }
}
exports.CreateCompanyAndProduct1734128555173 = CreateCompanyAndProduct1734128555173;
