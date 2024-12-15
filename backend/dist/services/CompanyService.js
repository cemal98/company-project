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
exports.CompanyService = void 0;
const typedi_1 = require("typedi");
const database_1 = require("../database");
const Company_1 = require("../entities/Company");
const uuid_1 = require("uuid");
const Product_1 = require("../entities/Product");
let CompanyService = class CompanyService {
    constructor() {
        this.companyRepository = database_1.AppDataSource.getMongoRepository(Company_1.Company);
        this.productRepository = database_1.AppDataSource.getMongoRepository(Product_1.Product);
    }
    getCompanyTableData(params) {
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
            const allCompanies = yield this.companyRepository.find({
                order: sort,
                where: {
                    deletedAt: null
                }
            });
            let filteredCompanies = allCompanies;
            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredCompanies = allCompanies.filter((company) => company.name.toLowerCase().includes(searchLower) ||
                    company.legalNumber.toLowerCase().includes(searchLower) ||
                    company.incorporationCountry.toLowerCase().includes(searchLower) ||
                    (company.website && company.website.toLowerCase().includes(searchLower)));
            }
            const results = filteredCompanies.slice(skip, skip + limit);
            return {
                results,
                total: filteredCompanies.length,
                page,
                totalPages: Math.ceil(filteredCompanies.length / limit),
            };
        });
    }
    createCompany(companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const newCompany = this.companyRepository.create(Object.assign(Object.assign({}, companyData), { id: (0, uuid_1.v4)() }));
            return this.companyRepository.save(newCompany);
        });
    }
    updateCompany(id, companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findOneBy({ id });
            if (!company)
                throw new Error("Company not found");
            Object.assign(company, companyData);
            company.updatedAt = new Date();
            return this.companyRepository.save(company);
        });
    }
    deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const company = yield this.companyRepository.findOneBy({ id });
            if (!company) {
                throw new Error(`Company with id ${id} not found`);
            }
            const products = yield this.productRepository.find({ where: { companyId: id } });
            for (const product of products) {
                product.deletedAt = new Date();
                yield this.productRepository.save(product);
            }
            company.deletedAt = new Date();
            return this.companyRepository.save(company);
        });
    }
    getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.companyRepository.find({
                where: { deletedAt: null },
                select: ["id", "name"]
            });
        });
    }
};
exports.CompanyService = CompanyService;
exports.CompanyService = CompanyService = __decorate([
    (0, typedi_1.Service)()
], CompanyService);
