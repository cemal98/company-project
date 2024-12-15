export interface Product {
  id: string;
  name: string;
  category: string;
  amount: number;
  amountUnit: string;
  companyId: string;
  createdAt: string;
}

export interface ProductTableData {
  results: Product[];
  total: number;
  page: number;
  totalPages: number;
}

export interface ProductTableParams {
  page: number;
  limit: number;
  sortBy?: string;
  order?: "ASC" | "DESC";
  search?:string;
}

export interface ProductEditData {
  id: string;
  updatedProduct: Product;
}