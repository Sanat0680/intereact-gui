// utils/ajaxHandler.ts
import type { AxiosRequestConfig } from "axios";
import axios from "axios";

const BASE_URL = "http://localhost:8710/dev";
export const ajaxHandler = async <T,>(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any,
  config?: AxiosRequestConfig
): Promise<T> => {
  try {
    const response = await axios({
      url: `${BASE_URL}${endpoint}`,
      method,
      data,
      ...config,
    });
    return response.data;
  } catch (error: any) {
    console.error("AJAX Error:", error);
    throw error.response?.data || error.message;
  }
};
