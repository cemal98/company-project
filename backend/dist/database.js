"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const path_1 = __importDefault(require("path"));
const Company_1 = require("./entities/Company");
const Product_1 = require("./entities/Product");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mongodb",
    database: "CompanyProject",
    url: process.env.DATABASE_URL,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    entities: [Company_1.Company, Product_1.Product],
    migrations: [path_1.default.join(__dirname, "./migrations/*.ts")],
    synchronize: false,
});
exports.AppDataSource.initialize()
    .then(() => {
    console.log("Data Source has been initialized!");
})
    .catch((err) => {
    console.error("Error during Data Source initialization", err);
});
