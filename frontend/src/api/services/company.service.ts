import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosHelper } from "../../helpers/axios.helper";
import { Company, CompanyTableData, CompanyTableParams } from "../interfaces/company.interface";

export const useGetCompanyTableData = (params: CompanyTableParams) => {
  type Response = Promise<CompanyTableData>;
  return useQuery(
    ["companyTableData", params],
    () => AxiosHelper.instance.get("/companies/table", { params }) as Response
  );
};

export const useCreateCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newCompany: Company) => {
      return AxiosHelper.instance.post("/companies", newCompany);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("companyTableData");
      },
    }
  );
};

export const useEditCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedCompany }: { id: string; updatedCompany: Company }) => {
      return AxiosHelper.instance.put(`/companies/${id}`, updatedCompany);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("companyTableData");
      },
    }
  );
};

export const useDeleteCompany = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      return AxiosHelper.instance.delete(`/companies/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("companyTableData");
      },
    }
  );
};

export const useGetCompanyList = () => {
  type Response = Promise<Company[]>;

  return useQuery("companyList", () =>
    AxiosHelper.instance.get("/companies/list") as Response
  );
};
