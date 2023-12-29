import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

interface ApiHookResult<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError<T> | null;
  fetchData: (url: string, method?: string, body?: any) => Promise<void>;
//   fetchData: (url: string, method?: 'GET' | 'POST' | 'PUT' | 'DELETE', body?: any) => Promise<void>;
}

const useApi = <T>(baseUrl: string): ApiHookResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError<T> | null>(null);

  const axiosInstance = axios.create({ baseURL: baseUrl });

//   const fetchData = async (url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE' = 'GET', body?: any): Promise<void> => {
  const fetchData = async (url: string, method: string = "GET", body: any = null): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      let response: AxiosResponse<T>;

      switch (method.toUpperCase()) {
        case "GET":
          response = await axiosInstance.get<T>(url);
          break;
        case "POST":
          response = await axiosInstance.post<T>(url, body);
          break;
        case "PUT":
          response = await axiosInstance.put<T>(url, body);
          break;
        case "DELETE":
          response = await axiosInstance.delete<T>(url);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }

      setData(response.data);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, fetchData };
};

export default useApi;
