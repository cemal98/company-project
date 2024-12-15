import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosHelper } from "../../helpers/axios.helper";
import { Product,ProductEditData,ProductTableData, ProductTableParams } from "../interfaces/product.interface";


export const useGetProductTableData = (params: ProductTableParams) => {
  type Response = Promise<ProductTableData>;

  return useQuery(
    ["productTableData", params],
    () => AxiosHelper.instance.get("/products/table", { params }) as Response
  );
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (newProduct: Product) => {
      return AxiosHelper.instance.post("/products", newProduct);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("productTableData");
      },
    }
  );
};

export const useEditProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ id, updatedProduct }: ProductEditData) => {
      return AxiosHelper.instance.put(`/products/${id}`, updatedProduct);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("productTableData");
      },
    }
  );
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (id: string) => {
      return AxiosHelper.instance.delete(`/products/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("productTableData");
      },
    }
  );
};
