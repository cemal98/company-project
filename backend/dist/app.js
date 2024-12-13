"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("reflect-metadata");
const routing_controllers_1 = require("routing-controllers");
const typedi_1 = require("typedi");
const routing_controllers_2 = require("routing-controllers");
const CompanyController_1 = require("./controllers/CompanyController");
(0, routing_controllers_1.useContainer)(typedi_1.Container);
exports.app = (0, routing_controllers_2.createExpressServer)({
    controllers: [CompanyController_1.CompanyController],
    cors: {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    },
});
