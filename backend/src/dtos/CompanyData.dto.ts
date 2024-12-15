export class CompanyTableDataParams {
    page: number;
    limit: number;
    sortBy: string = "createdAt";
    order: "ASC" | "DESC" = "ASC";
    search?:string;
}