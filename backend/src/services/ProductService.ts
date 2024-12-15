import { Service } from "typedi";
import { AppDataSource } from "../database";
import { Product } from "../entities/Product";
import { ProductTableDataParams } from "../dtos/ProductData.dto";
import { v4 as uuidv4 } from "uuid";

@Service()
export class ProductService {
  private productRepository = AppDataSource.getMongoRepository(Product);

  async getProductTableData(params: ProductTableDataParams) {
    const page = parseInt(params.page as any, 10);
    const limit = parseInt(params.limit as any, 10);

    if (isNaN(page) || isNaN(limit)) {
      throw new Error("Page and limit must be valid integers.");
    }

    const sortBy = params.sortBy || "createdAt";
    const order = params.order === "DESC" ? -1 : 1;

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: order };

    const allProducts = await this.productRepository.find({
      where: { deletedAt: null },
      order: sort,
    });

    let filteredProducts = allProducts;

    if (params.search) {
      const searchLower = params.search.toLowerCase();
      filteredProducts = allProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(searchLower) ||
          product.category.toLowerCase().includes(searchLower) ||
          product.amountUnit.toLowerCase().includes(searchLower)
      );
    }

    const results = filteredProducts.slice(skip, skip + limit);

    return {
      results,
      total: filteredProducts.length,
      page,
      totalPages: Math.ceil(filteredProducts.length / limit),
    };
  }

  async createProduct(productData: Partial<Product>) {
    const newProduct = this.productRepository.create({
      ...productData,
      id: uuidv4(),
    });

    return this.productRepository.save(newProduct);
  }

  async updateProduct(id: string, productData: Partial<Product>) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new Error("Product not found");
    Object.assign(product, productData, { updatedAt: new Date() });
    return this.productRepository.save(product);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new Error("Product not found");
    product.deletedAt = new Date();
    return this.productRepository.save(product);
  }
}
