import { Service } from "typedi";
import { AppDataSource } from "../database";
import { Company } from "../entities/Company";
import { Product } from "../entities/Product";
import { DashboardDataDto, PieChartData } from "../dtos/DashboardData.dto";

interface ProductCountResult {
  _id: string;
  productCount: number;
}

@Service()
export class DashboardService {
  private companyRepository = AppDataSource.getMongoRepository(Company);
  private productRepository = AppDataSource.getMongoRepository(Product);

  async getDashboardData(): Promise<DashboardDataDto> {
    const totalCompanies = await this.companyRepository.count();
    const totalProducts = await this.productRepository.count();
  
    const companiesWithProductCounts = await this.productRepository.aggregate<ProductCountResult>([
      { $match: { deletedAt: null } },
      { $group: { _id: "$companyId", productCount: { $sum: 1 } } },
      { $sort: { productCount: -1 } },
      { $limit: 1 },
    ]).toArray();
  
    let mostProductCompany = null;
  
    if (companiesWithProductCounts.length > 0) {
      const companyId = companiesWithProductCounts[0]._id;
      const productCount = (companiesWithProductCounts[0] as unknown as ProductCountResult).productCount;
  
      const company = await this.companyRepository.findOne({ where: { id: companyId } });
  
      if (company) {
        mostProductCompany = {
          name: company.name,
          productCount: productCount,
        };
      }
    }
  
    const mostStockProduct = await this.productRepository.find({
      where: { deletedAt: null },
      order: { amount: "DESC" },
      take: 1,
    });
  
    const mostStockProductData = mostStockProduct[0]
      ? { name: mostStockProduct[0].name, amount: mostStockProduct[0].amount }
      : null;
  
      const last30Days = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      const companies = await this.companyRepository.find({
        where: {
          deletedAt: null,
        },
      });

      const products = await this.productRepository.find({
        where: {
          deletedAt: null,
        },
      });
      
      const companiesInLast30Days = companies.filter((company) => {
        const createdAtDate = new Date(company.createdAt);
        return createdAtDate >= last30Days;
      }).length;
  
      const productsInLast30Days = products.filter((product) => {
        const date = new Date(product.createdAt);
        return date >= last30Days;
      }).length;
  
    return {
      totalCompanies,
      totalProducts,
      mostProductCompany,
      mostStockProduct: mostStockProductData,
      companiesInLast30Days,
      productsInLast30Days,
    };
  }
  
  async getDashboardChartData(type: string, startDate: string, endDate: string): Promise<{ date: string; count: number }[]> {
    const start = new Date(startDate);
    const end = new Date(endDate);
  
    if (type === "company") {
      const companies = await this.companyRepository.find();
      const filteredAndSortedCompanies = this.filterAndSortByDate(companies, "createdAt", start, end);
      const monthlyCounts = this.groupByMonth(filteredAndSortedCompanies, "createdAt");
      return monthlyCounts;
    }
  
    if (type === "product") {
      const products = await this.productRepository.find();
      const filteredAndSortedProducts = this.filterAndSortByDate(products, "createdAt", start, end);
      const monthlyCounts = this.groupByMonth(filteredAndSortedProducts, "createdAt");
      return monthlyCounts;
    }
  
    throw new Error("Invalid type. Please use 'company' or 'product'.");
  }

  async getLatestTableData(type: string): Promise<any[]> {
    if (type === "company") {
      const companies = await this.companyRepository.find({
        order: { createdAt: "DESC" },
        take: 3,
      });
      return companies;
    }

    if (type === "product") {
      const products = await this.productRepository.find({
        order: { createdAt: "DESC" },
        take: 3,
      });
      return products;
    }
  
    throw new Error("Invalid type. Please use 'company' or 'product'.");
  }

  async getPieChartData(): Promise<PieChartData[]> {
    const companies = await this.companyRepository.find({
      where: {
        deletedAt: null,
      },
    });

    const cityCounts: { [key: string]: number } = {};
    companies.forEach((company) => {
      const city = company.incorporationCountry || "Other";
      cityCounts[city] = (cityCounts[city] || 0) + 1;
    });

    const pieChartData: PieChartData[] = Object.keys(cityCounts).map((city) => ({
      name: city,
      value: cityCounts[city],
    }));
    return pieChartData;
  }
  
  private groupByMonth(data: any[], dateField: string) {
    const groupedData = data.reduce((acc: Record<string, number>, item) => {
      const date = new Date(item[dateField]);
      const month = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}`;
      acc[month] = (acc[month] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(groupedData).map(([date, count]) => ({ date, count }));
  }

  private filterAndSortByDate<T>(data: T[], dateField: string, start: Date, end: Date): T[] {
    return data
      .filter((item) => {
        const date = new Date((item as any)[dateField]);
        return date >= start && date < end;
      })
      .sort((a, b) => {
        const dateA = new Date((a as any)[dateField]).getTime();
        const dateB = new Date((b as any)[dateField]).getTime();
        return dateA - dateB;
      });
  }
  
}
