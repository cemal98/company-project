import {
    JsonController,
  } from "routing-controllers";
  import { Service } from "typedi";
import { ProductService } from "../services/ProductService";
  
  @Service()
  @JsonController("/products")
  export class ProductController {
    constructor(private service: ProductService) {}
  
  }
  