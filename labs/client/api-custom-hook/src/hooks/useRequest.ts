import { useState } from "react";
import axios, { AxiosResponse, AxiosError } from "axios";

// Define types for the data, loading, and error states
interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
}

// Define the type for the RequestHookProps hook
interface RequestHookProps<T> {
  data: T | null;
  loading: boolean;
  error: AxiosError | null;
  fetchData: (url: string) => Promise<void>;
  postData: (url: string, body: any) => Promise<void>;
  putData: (url: string, body: any) => Promise<void>;
  deleteData: (url: string) => Promise<void>;
}

function useRequest<T>(baseUrl: string): RequestHookProps<T> {
  const [apiState, setApiState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });

  const axiosInstance = axios.create({
    baseURL: baseUrl,
  });

  const fetchData = async (url: string): Promise<void> => {
    setApiState({ ...apiState, loading: true });
    try {
      const response: AxiosResponse<T> = await axiosInstance.get(url);
      setApiState({ data: response.data, loading: false, error: null });
    } catch (err: any) {
      setApiState({ ...apiState, error: err, loading: false });
    }
  };

  const postData = async (url: string, body: any): Promise<void> => {
    setApiState({ ...apiState, loading: true });
    try {
      const response: AxiosResponse<T> = await axiosInstance.post(url, body);
      setApiState({ data: response.data, loading: false, error: null });
    } catch (err: any) {
      setApiState({ ...apiState, error: err, loading: false });
    }
  };

  const putData = async (url: string, body: any): Promise<void> => {
    setApiState({ ...apiState, loading: true });
    try {
      const response: AxiosResponse<T> = await axiosInstance.put(url, body);
      setApiState({ data: response.data, loading: false, error: null });
    } catch (err: any) {
      setApiState({ ...apiState, error: err, loading: false });
    }
  };

  const deleteData = async (url: string): Promise<void> => {
    setApiState({ ...apiState, loading: true });
    try {
      await axiosInstance.delete(url);
      setApiState({ data: null, loading: false, error: null });
    } catch (err: any) {
      setApiState({ ...apiState, error: err, loading: false });
    }
  };

  return {
    data: apiState.data,
    loading: apiState.loading,
    error: apiState.error,
    fetchData,
    postData,
    putData,
    deleteData,
  };
}

export default useRequest;
