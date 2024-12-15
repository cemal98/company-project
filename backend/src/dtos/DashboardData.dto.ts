export class MostProductCompany {
    name: string;
    productCount: number;
}

export class MostStockProduct {
    name:string;
    amount:number;
}

export class DashboardDataDto {
    totalCompanies: number;
    totalProducts: number;
    mostProductCompany: MostProductCompany | null;
    mostStockProduct: MostStockProduct | null;
    companiesInLast30Days: number;
    productsInLast30Days: number;
}

export interface DashboardChartParams {
    type: string;
    startDate:string;
    endDate:string
}

export interface DashboardTableParams {
    type: string;
}

export interface PieChartData {
    name: string;
    value: number;
  }