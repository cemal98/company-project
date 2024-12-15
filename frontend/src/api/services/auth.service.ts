import { useQuery, useMutation, useQueryClient } from "react-query";
import { AxiosHelper } from "../../helpers/axios.helper";
import { AUTH_KEYS } from "../../constants/query-keys";
import { User } from "../interfaces/user.interface";
import { LoginParams, LoginResponse, RegisterParams } from "../interfaces/auth.interface";

export const useGetUser = () => {
  return useQuery<User>(
    [AUTH_KEYS.user],
    () => AxiosHelper.instance.get("/auth/me"),
    {
      retry: false,
      staleTime: 5 * 60 * 1000,
      cacheTime: 10 * 60 * 1000,
    }
  );
};

export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async (params: LoginParams): Promise<LoginResponse> => {
      const data = await AxiosHelper.instance.post<any, LoginResponse>(
        "/auth/login",
        params
      );
      return data;
    },
    {
      onSuccess: (data) => {
        localStorage.setItem("token", data.token);
        queryClient.invalidateQueries(AUTH_KEYS.user);
      },
      onError: (error) => {
        console.error("Login error:", error);
      },
    }
  );
};

export const useRegister = () => {
  return useMutation((params: RegisterParams) =>
    AxiosHelper.instance.post("/auth/register", params)
  );
};

