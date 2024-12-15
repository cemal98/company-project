import axios, { AxiosInstance } from "axios";
import { getError } from "./api.helper";

export class AxiosHelper {
  static instance: AxiosInstance;

  constructor(baseURL: string) {
    if (!AxiosHelper.instance) {
      AxiosHelper.instance = axios.create({ baseURL });
      this.addMws();
    }
  }

  private addMws() {
    AxiosHelper.instance.interceptors.response.use(
      (response) => {
        return response.data;
      },
      (error) => {
        const { response } = error;

        if (response?.status === 401 && response?.data?.message === "Invalid token") {
          localStorage.removeItem("token");
          window.location.href = "/login";
        }

        // Diğer hataları işleme
        throw getError(error);
      }
    );

    AxiosHelper.instance.interceptors.request.use((config) => {
      const token = localStorage.getItem("token");
      if (token) {
        if (!config.headers) {
          (config.headers as any) = {};
        }
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
      return config;
    });
  }
}

const backendURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
new AxiosHelper(backendURL);
