import "reflect-metadata";
import { useContainer } from "routing-controllers";
import { Container } from "typedi";
import { createExpressServer } from "routing-controllers";
import { CompanyController } from "./controllers/CompanyController";

useContainer(Container);

export const app = createExpressServer({
  controllers: [CompanyController],
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  },
});
