import { create } from "zustand";
import axios, { AxiosResponse, AxiosError, Method } from "axios";

type ApiStore = {
  data: any;
  error: AxiosError | null;
  loading: boolean;

  fetchData: (url: string, method: Method, data?: any) => Promise<void>;
};

const useApiStore = create<ApiStore>((set) => ({
  data: null,
  loading: false,
  error: null,

  fetchData: async (url, method, data = null) => {
    set({ loading: true, error: null });

    try {
      const response: AxiosResponse = await axios({
        method: method,
        url: url,
        data: data,
      });

      set({ data: response.data, loading: false });
    } catch (error) {
      const axiosError: AxiosError = error as AxiosError;
      set({ error: axiosError, loading: false });
    }
  },
}));

export default useApiStore;
