import "reflect-metadata";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";
import { createExpressServer } from "routing-controllers";
import { CompanyController } from "./controllers/CompanyController";
import { AuthMiddleware } from "./middlewares/AuthMiddleware";
import { AuthController } from "./controllers/AuthController";

useContainer(Container);

export const app = createExpressServer({
  controllers: [CompanyController,AuthController],
  middlewares: [AuthMiddleware],
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
