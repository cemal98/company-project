"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.CompanyController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const CompanyService_1 = require("../services/CompanyService");
const CompanyData_dto_1 = require("../dtos/CompanyData.dto");
let CompanyController = class CompanyController {
    constructor(service) {
        this.service = service;
    }
    getAllCompanies() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getAllCompanies();
        });
    }
    getDashboardTableData(params) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.getCompanyTableData(params);
        });
    }
    createCompany(companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.createCompany(companyData);
        });
    }
    updateCompany(id, companyData) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.updateCompany(id, companyData);
        });
    }
    deleteCompany(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.deleteCompany(id);
        });
    }
};
exports.CompanyController = CompanyController;
__decorate([
    (0, routing_controllers_1.Get)("/list"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getAllCompanies", null);
__decorate([
    (0, routing_controllers_1.Get)("/table"),
    __param(0, (0, routing_controllers_1.QueryParams)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CompanyData_dto_1.CompanyTableDataParams]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "getDashboardTableData", null);
__decorate([
    (0, routing_controllers_1.Post)("/"),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "createCompany", null);
__decorate([
    (0, routing_controllers_1.Put)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __param(1, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "updateCompany", null);
__decorate([
    (0, routing_controllers_1.Delete)("/:id"),
    __param(0, (0, routing_controllers_1.Param)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CompanyController.prototype, "deleteCompany", null);
exports.CompanyController = CompanyController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/companies"),
    __metadata("design:paramtypes", [CompanyService_1.CompanyService])
], CompanyController);
