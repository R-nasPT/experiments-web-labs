import { useState, useEffect } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

interface ApiResponse<T> {
  data: T | null;
  error: AxiosError<T> | null;
  loading: boolean;
}

const useResponse = <T>(baseUrl: string) => {
  const [apiResponse, setApiResponse] = useState<ApiResponse<T>>({
    data: null,
    error: null,
    loading: false,
  });

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const fetchData = async (url: string, method: "get" | "post" | "put" | "delete", body?: any) => {
    setApiResponse((prevState) => ({ ...prevState, loading: true }));

    try {
      let response: AxiosResponse<T>;

      switch (method.toUpperCase()) {
        case "get":
          response = await axiosInstance.get<T>(url);
          break;
        case "post":
          response = await axiosInstance.post<T>(url, body);
          break;
        case "put":
          response = await axiosInstance.put<T>(url, body);
          break;
        case "delete":
          response = await axiosInstance.delete<T>(url);
          break;
        default:
          throw new Error("Invalid method");
      }

      setApiResponse({ data: response.data, error: null, loading: false });
    } catch (error: any) {
      setApiResponse({ data: null, error, loading: false });
    }
  };

  return { ...apiResponse, fetchData };
};

export default useResponse;
