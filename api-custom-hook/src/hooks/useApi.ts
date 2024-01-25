import axios, { AxiosResponse, AxiosError } from "axios";
import { useState } from "react";

type ApiHookProps<T> = {
  data: T | null;
  loading: boolean;
  error: AxiosError<any> | null;
  fetchData: (url: string) => Promise<void>;
  postData: (url: string, body: any) => Promise<void>;
  putData: (url: string, body: any) => Promise<void>;
  deleteData: (url: string) => Promise<void>;
};

function useApi<T>(baseUrl: string): ApiHookProps<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AxiosError<any> | null>(null);

  const axiosInstance = axios.create({ baseURL: baseUrl });

  const fetchData = async (url: string): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url);
      setData(response.data);
      setError(null);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const postData = async (url: string, body: any): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, body);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const putData = async (url: string, body: any): Promise<void> => {
    setLoading(true);
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(url, body);
      setData(response.data);
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteData = async (url: string): Promise<void> => {
    setLoading(true);
    try {
      await axiosInstance.delete(url);
      setData(null); // For DELETE, no need for returned data
      setError(null);
    } catch (err: any) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fetchData,
    postData,
    putData,
    deleteData,
  };
}

export default useApi;
