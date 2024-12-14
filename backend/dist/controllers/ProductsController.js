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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductController = void 0;
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const ProductService_1 = require("../services/ProductService");
let ProductController = class ProductController {
    constructor(service) {
        this.service = service;
    }
};
exports.ProductController = ProductController;
exports.ProductController = ProductController = __decorate([
    (0, typedi_1.Service)(),
    (0, routing_controllers_1.JsonController)("/products"),
    __metadata("design:paramtypes", [ProductService_1.ProductService])
], ProductController);
