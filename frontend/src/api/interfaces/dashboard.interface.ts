import { Company } from "./company.interface";
import { Product } from "./product.interface";

export interface MostProductCompany {
    name: string;
    productCount: number;
}

export interface MostStockProduct {
    name:string;
    amount:number;
}

export interface DashboardData {
    totalCompanies: number;
    totalProducts: number;
    mostProductCompany: MostProductCompany | null;
    mostStockProduct: MostStockProduct | null;
    companiesInLast30Days: number;
    productsInLast30Days: number;
}

export interface DashboardChartDataParams {
    startDate:string;
    endDate:string;
    type:string
}

export interface DashboardChartData {
    date: string;
    [key: string]: number | string;
}

export interface DashboardTableDataParams {
    type:string
}

export type TableData = Company | Product;

export interface PieChartData {
    name:string;
    value: number;
}
