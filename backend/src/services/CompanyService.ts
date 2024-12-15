import { Service } from "typedi";
import { AppDataSource } from "../database";
import { Company } from "../entities/Company";
import { CompanyTableDataParams } from "../dtos/CompanyData.dto";
import { v4 as uuidv4 } from "uuid";
import { Product } from "../entities/Product";

@Service()
export class CompanyService {
  private companyRepository = AppDataSource.getMongoRepository(Company);
  private productRepository = AppDataSource.getMongoRepository(Product);

  async getCompanyTableData(params: CompanyTableDataParams) {
    const page = parseInt(params.page as any, 10);
    const limit = parseInt(params.limit as any, 10);
    if (isNaN(page) || isNaN(limit)) {
      throw new Error("Page and limit must be valid integers.");
    }

    const sortBy = params.sortBy || "createdAt";
    const order = params.order === "DESC" ? -1 : 1;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: order };

    const allCompanies = await this.companyRepository.find({
      order: sort,
      where: {
        deletedAt: null
      }
    });

    let filteredCompanies = allCompanies;
    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredCompanies = allCompanies.filter(
        (company) =>
          company.name.toLowerCase().includes(searchLower) ||
          company.legalNumber.toLowerCase().includes(searchLower) ||
          company.incorporationCountry.toLowerCase().includes(searchLower) ||
          (company.website && company.website.toLowerCase().includes(searchLower))
      );
    }

    const results = filteredCompanies.slice(skip, skip + limit);

    return {
      results,
      total: filteredCompanies.length,
      page,
      totalPages: Math.ceil(filteredCompanies.length / limit),
    };
  }

  async createCompany(companyData: Partial<Company>) {
    const newCompany = this.companyRepository.create({
      ...companyData,
      id: uuidv4(),
    });
    return this.companyRepository.save(newCompany);
  }

  async updateCompany(id: string, companyData: Partial<Company>) {
    const company = await this.companyRepository.findOneBy({ id });
    if (!company) throw new Error("Company not found");
  
    Object.assign(company, companyData);
  
    company.updatedAt = new Date();
  
    return this.companyRepository.save(company);
  }

  async deleteCompany(id: string) {
    const company = await this.companyRepository.findOneBy({ id });
  
    if (!company) {
      throw new Error(`Company with id ${id} not found`);
    }
  
    const products = await this.productRepository.find({ where: { companyId: id } });
  
    for (const product of products) {
      product.deletedAt = new Date();
      await this.productRepository.save(product);
    }
  
    company.deletedAt = new Date();
    return this.companyRepository.save(company);
  }
  
  async getAllCompanies() {
    return this.companyRepository.find({
      where: { deletedAt: null },
      select: ["id", "name"]
    });
  }
}
