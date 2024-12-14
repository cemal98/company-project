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
exports.AuthController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const AuthService_1 = require("../services/AuthService");
let AuthController = class AuthController {
    constructor(service) {
        this.service = service;
    }
    register(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.register(body.username, body.password, body.email);
        });
    }
    login(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.service.login(body.username, body.password);
        });
    }
    getProfile(req) {
        return __awaiter(this, void 0, void 0, function* () {
            return { user: req.user };
        });
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, routing_controllers_1.Post)("/register"),
    (0, routing_controllers_1.HttpCode)(201),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "register", null);
__decorate([
    (0, routing_controllers_1.Post)("/login"),
    (0, routing_controllers_1.HttpCode)(200),
    __param(0, (0, routing_controllers_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, routing_controllers_1.Get)("/me"),
    (0, routing_controllers_1.Authorized)(),
    (0, routing_controllers_1.HttpCode)(200),
    __param(0, (0, routing_controllers_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "getProfile", null);
exports.AuthController = AuthController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/auth"),
    __metadata("design:paramtypes", [AuthService_1.AuthService])
], AuthController);
