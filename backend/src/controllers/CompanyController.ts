import {
    JsonController,
  } from "routing-controllers";
  import { Service } from "typedi";
import { CompanyService } from "../services/CompanyService";
  
  @Service()
  @JsonController("/companies")
  export class CompanyController {
    constructor(private service: CompanyService) {}
  
  }
  