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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCollections = void 0;
class CreateCollections {
    up(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoManager = queryRunner.connection.mongoManager;
            // Koleksiyon oluşturma (MongoDB'de gerekirse yeni koleksiyon oluşur)
            yield mongoManager.insertOne("companies", { name: "Placeholder Company" });
            yield mongoManager.insertOne("products", { name: "Placeholder Product" });
            console.log("Koleksiyonlar oluşturuldu: companies, products");
        });
    }
    down(queryRunner) {
        return __awaiter(this, void 0, void 0, function* () {
            const mongoManager = queryRunner.connection.mongoManager;
            // Koleksiyonları temizleme
            yield mongoManager.deleteMany("companies", {});
            yield mongoManager.deleteMany("products", {});
            console.log("Koleksiyonlar temizlendi: companies, products");
        });
    }
}
exports.CreateCollections = CreateCollections;
