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
exports.DashboardService = void 0;
const typedi_1 = require("typedi");
const database_1 = require("../database");
const Company_1 = require("../entities/Company");
const Product_1 = require("../entities/Product");
let DashboardService = class DashboardService {
    constructor() {
        this.companyRepository = database_1.AppDataSource.getMongoRepository(Company_1.Company);
        this.productRepository = database_1.AppDataSource.getMongoRepository(Product_1.Product);
    }
    getDashboardData() {
        return __awaiter(this, void 0, void 0, function* () {
            const totalCompanies = yield this.companyRepository.count();
            const totalProducts = yield this.productRepository.count();
            const companiesWithProductCounts = yield this.productRepository.aggregate([
                { $match: { deletedAt: null } },
                { $group: { _id: "$companyId", productCount: { $sum: 1 } } },
                { $sort: { productCount: -1 } },
                { $limit: 1 },
            ]).toArray();
            let mostProductCompany = null;
            if (companiesWithProductCounts.length > 0) {
                const companyId = companiesWithProductCounts[0]._id;
                const productCount = companiesWithProductCounts[0].productCount;
                const company = yield this.companyRepository.findOne({ where: { id: companyId } });
                if (company) {
                    mostProductCompany = {
                        name: company.name,
                        productCount: productCount,
                    };
                }
            }
            const mostStockProduct = yield this.productRepository.find({
                where: { deletedAt: null },
                order: { amount: "DESC" },
                take: 1,
            });
            const mostStockProductData = mostStockProduct[0]
                ? { name: mostStockProduct[0].name, amount: mostStockProduct[0].amount }
                : null;
            const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
            const companies = yield this.companyRepository.find({
                where: {
                    deletedAt: null,
                },
            });
            const products = yield this.productRepository.find({
                where: {
                    deletedAt: null,
                },
            });
            const companiesInLast30Days = companies.filter((company) => {
                const createdAtDate = new Date(company.createdAt);
                return createdAtDate >= last30Days;
            }).length;
            const productsInLast30Days = products.filter((product) => {
                const date = new Date(product.createdAt);
                return date >= last30Days;
            }).length;
            return {
                totalCompanies,
                totalProducts,
                mostProductCompany,
                mostStockProduct: mostStockProductData,
                companiesInLast30Days,
                productsInLast30Days,
            };
        });
    }
    getDashboardChartData(type, startDate, endDate) {
        return __awaiter(this, void 0, void 0, function* () {
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (type === "company") {
                const companies = yield this.companyRepository.find();
                const filteredAndSortedCompanies = this.filterAndSortByDate(companies, "createdAt", start, end);
                const monthlyCounts = this.groupByMonth(filteredAndSortedCompanies, "createdAt");
                return monthlyCounts;
            }
            if (type === "product") {
                const products = yield this.productRepository.find();
                const filteredAndSortedProducts = this.filterAndSortByDate(products, "createdAt", start, end);
                const monthlyCounts = this.groupByMonth(filteredAndSortedProducts, "createdAt");
                return monthlyCounts;
            }
            throw new Error("Invalid type. Please use 'company' or 'product'.");
        });
    }
    getLatestTableData(type) {
        return __awaiter(this, void 0, void 0, function* () {
            if (type === "company") {
                const companies = yield this.companyRepository.find({
                    order: { createdAt: "DESC" },
                    take: 3,
                });
                return companies;
            }
            if (type === "product") {
                const products = yield this.productRepository.find({
                    order: { createdAt: "DESC" },
                    take: 3,
                });
                return products;
            }
            throw new Error("Invalid type. Please use 'company' or 'product'.");
        });
    }
    getPieChartData() {
        return __awaiter(this, void 0, void 0, function* () {
            const companies = yield this.companyRepository.find({
                where: {
                    deletedAt: null,
                },
            });
            const cityCounts = {};
            companies.forEach((company) => {
                const city = company.incorporationCountry || "Other";
                cityCounts[city] = (cityCounts[city] || 0) + 1;
            });
            const pieChartData = Object.keys(cityCounts).map((city) => ({
                name: city,
                value: cityCounts[city],
            }));
            return pieChartData;
        });
    }
    groupByMonth(data, dateField) {
        const groupedData = data.reduce((acc, item) => {
            const date = new Date(item[dateField]);
            const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
            acc[month] = (acc[month] || 0) + 1;
            return acc;
        }, {});
        return Object.entries(groupedData).map(([date, count]) => ({ date, count }));
    }
    filterAndSortByDate(data, dateField, start, end) {
        return data
            .filter((item) => {
            const date = new Date(item[dateField]);
            return date >= start && date < end;
        })
            .sort((a, b) => {
            const dateA = new Date(a[dateField]).getTime();
            const dateB = new Date(b[dateField]).getTime();
            return dateA - dateB;
        });
    }
};
exports.DashboardService = DashboardService;
exports.DashboardService = DashboardService = __decorate([
    (0, typedi_1.Service)()
], DashboardService);
