import { useQuery } from "react-query";
import { DashboardChartData, DashboardChartDataParams, DashboardData, DashboardTableDataParams, PieChartData, TableData } from "../interfaces/dashboard.interface";
import { AxiosHelper } from "../../helpers/axios.helper";


export const useGetDashboardData = () => {
  type Response = Promise<DashboardData>;
  
  return useQuery(
    ["dashboardData"],
    () => AxiosHelper.instance.get("/dashboard") as Response,
  );
};

export const useGetDashboardChartData = (params:DashboardChartDataParams) => {
  type Response = Promise<DashboardChartData[]>;
  return useQuery(
    ["dashboardChartData", params],
    () => AxiosHelper.instance.get("/dashboard/chart", {params}) as Response,
    {enabled: !!params.startDate && !!params.endDate}
  )
}

export const useGetDashboardTableData = (params:DashboardTableDataParams) => {
  type Response = Promise<TableData[]>;
  return useQuery(
    ["dashboardTableData", params],
    () => AxiosHelper.instance.get("/dashboard/table", {params}) as Response,
  )
}

export const useGetDashboardPieChartData = () => {
  type Response = Promise<PieChartData[]>;
  return useQuery(
    ["dashboardPieChartData"],
    () => AxiosHelper.instance.get("/dashboard/pie") as Response
  );
};
