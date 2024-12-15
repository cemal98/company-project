import {
  Get,
  Post,
  Put,
  Delete,
  JsonController,
  QueryParams,
  Body,
  Param,
} from "routing-controllers";
import { Service } from "typedi";
import { CompanyService } from "../services/CompanyService";
import { CompanyTableDataParams } from "../dtos/CompanyData.dto";
import { Company } from "../entities/Company";

@Service()
@JsonController("/companies")
export class CompanyController {
  constructor(private service: CompanyService) {}

  @Get("/list")
  async getAllCompanies() {
    return this.service.getAllCompanies();
  }

  @Get("/table")
  async getDashboardTableData(@QueryParams() params: CompanyTableDataParams) {
    return this.service.getCompanyTableData(params);
  }

  @Post("/")
  async createCompany(@Body() companyData: Partial<Company>) {
    return this.service.createCompany(companyData);
  }

  @Put("/:id")
  async updateCompany(
    @Param("id") id: string,
    @Body() companyData: Partial<Company>
  ) {
    return this.service.updateCompany(id, companyData);
  }

  @Delete("/:id")
  async deleteCompany(@Param("id") id: string) {
    return this.service.deleteCompany(id);
  }
}
