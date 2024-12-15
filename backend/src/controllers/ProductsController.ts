import {
  JsonController,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  QueryParams,
} from "routing-controllers";
import { Service } from "typedi";
import { ProductService } from "../services/ProductService";
import { Product } from "../entities/Product";
import { ProductTableDataParams } from "../dtos/ProductData.dto";

@Service()
@JsonController("/products")
export class ProductController {
  constructor(private service: ProductService) {}

  @Get("/table")
  async getProductTableData(@QueryParams() params: ProductTableDataParams) {
    return this.service.getProductTableData(params);
  }

  @Post("/")
  async createProduct(@Body() productData: Partial<Product>) {
    return this.service.createProduct(productData);
  }

  @Put("/:id")
  async updateProduct(@Param("id") id: string, @Body() productData: Partial<Product>) {
    return this.service.updateProduct(id, productData);
  }

  @Delete("/:id")
  async deleteProduct(@Param("id") id: string) {
    return this.service.deleteProduct(id);
  }
}
