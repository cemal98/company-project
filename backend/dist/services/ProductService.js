"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.ProductService = void 0;
const typedi_1 = require("typedi");
const database_1 = require("../database");
const Product_1 = require("../entities/Product");
const uuid_1 = require("uuid");
let ProductService = class ProductService {
    constructor() {
        this.productRepository = database_1.AppDataSource.getMongoRepository(Product_1.Product);
    }
    getProductTableData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const page = parseInt(params.page, 10);
            const limit = parseInt(params.limit, 10);
            if (isNaN(page) || isNaN(limit)) {
                throw new Error("Page and limit must be valid integers.");
            }
            const sortBy = params.sortBy || "createdAt";
            const order = params.order === "DESC" ? -1 : 1;
            const skip = (page - 1) * limit;
            const sort = { [sortBy]: order };
            const allProducts = yield this.productRepository.find({
                where: { deletedAt: null },
                order: sort,
            });
            let filteredProducts = allProducts;
            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredProducts = allProducts.filter((product) => product.name.toLowerCase().includes(searchLower) ||
                    product.category.toLowerCase().includes(searchLower) ||
                    product.amountUnit.toLowerCase().includes(searchLower));
            }
            const results = filteredProducts.slice(skip, skip + limit);
            return {
                results,
                total: filteredProducts.length,
                page,
                totalPages: Math.ceil(filteredProducts.length / limit),
            };
        });
    }
    createProduct(productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newProduct = this.productRepository.create(Object.assign(Object.assign({}, productData), { id: (0, uuid_1.v4)() }));
            return this.productRepository.save(newProduct);
        });
    }
    updateProduct(id, productData) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOneBy({ id });
            if (!product)
                throw new Error("Product not found");
            Object.assign(product, productData, { updatedAt: new Date() });
            return this.productRepository.save(product);
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = yield this.productRepository.findOneBy({ id });
            if (!product)
                throw new Error("Product not found");
            product.deletedAt = new Date();
            return this.productRepository.save(product);
        });
    }
};
exports.ProductService = ProductService;
exports.ProductService = ProductService = __decorate([
    (0, typedi_1.Service)()
], ProductService);
