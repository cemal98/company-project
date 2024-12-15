import {
    JsonController,
    Get,
    QueryParams
  } from "routing-controllers";
  import { Service } from "typedi";
import { DashboardService } from "../services/DashboardService";
import { DashboardChartParams, DashboardDataDto, DashboardTableParams, PieChartData } from "../dtos/DashboardData.dto";
  
  @Service()
  @JsonController("/dashboard")
  export class DashboardController {
    constructor(private service: DashboardService) {}

    @Get("/")
    async getDashboardData(): Promise<DashboardDataDto> {
      return this.service.getDashboardData();
    }

    @Get("/chart")
    async getDashboardChartData(
      @QueryParams() params:DashboardChartParams
    ) {
      const { type, startDate, endDate } = params;
  
      return this.service.getDashboardChartData(type, startDate, endDate);
    }

    @Get("/table")
    async getDashboardTableData(
      @QueryParams() params:DashboardTableParams
    ) {
      const { type } = params;
      return this.service.getLatestTableData(type);
    }

    @Get("/pie")
    async getPieChartData(): Promise<PieChartData[]> {
      return this.service.getPieChartData();
    }
  }
  