export interface Company {
    id: string;
    name: string;
    legalNumber: string;
    incorporationCountry: string;
    website: string;
    createdAt: string;
}

export interface CompanyTableData {
    results: Company[];
    total: number;
    page: number;
    totalPages: number;
}

export interface CompanyTableParams {
    page: number;
    limit: number;
    sortBy?: string;
    order?: "ASC" | "DESC";
    search?:string;
}