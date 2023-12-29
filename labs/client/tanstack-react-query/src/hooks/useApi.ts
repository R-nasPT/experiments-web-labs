import axios, { AxiosInstance } from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

type ApiHookProps = {
  baseURL: string;
  url: string;
};

type AxiosParams = {
  axiosInstance: AxiosInstance;
  url: string;
  newData?: any;
  id?: number | string;
};

const createAxiosInstance = (baseURL: string): AxiosInstance => {
  return axios.create({ baseURL: baseURL });
};
// AXIOS GET ---
const getData = async ({ axiosInstance, url }: AxiosParams): Promise<any> => {
  const { data } = await axiosInstance.get(`/${url}`);
  return data;
};

// AXIOS POST ---
const createData = async ({ axiosInstance, url, newData }: AxiosParams): Promise<any> => {
  const { data } = await axiosInstance.post(`/${url}`, newData);
  return data;
};

// AXIOS PUT ---
const updateData = async ({ axiosInstance, url, newData, id }: AxiosParams): Promise<any> => {
  const endpoint = id ? `/${url}/${id}` : `/${url}`;
  const { data } = await axiosInstance.put(endpoint, newData);
  return data;
};

// AXIOS DELETE ---
const deleteData = async ({ axiosInstance, url, id }: AxiosParams): Promise<any> => {
  const { data } = await axiosInstance.delete(`/${url}/${id}`);
  return data;
};

// ============================================================================= //
// === จะสามารถใช้งาน function จากข้างนอกได้ ต้องให้ function นั้นอยู่ใน Hook เท่านั้น ===

function useApi({ baseURL, url }: ApiHookProps) {
  const axiosInstance = createAxiosInstance(baseURL);
  const queryClient = useQueryClient();

  //FETCH ---
  const getQuery = useQuery({
    queryKey: ["fetchData"],
    queryFn: () => getData({ axiosInstance, url }),
  });

  //INSERT ---
  const createMutation = useMutation({
    mutationFn: (newData: any) => createData({ axiosInstance, url, newData }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["insertData"] }),
  });

  //EDIT ---
  const updateMutation = useMutation({ //-- id จะระบุหรือไม่ก็ได้
    mutationFn: ({ id, newData }: { id?: number | string; newData: any }) =>
      updateData({ axiosInstance, url, newData, id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["editData"] }),
  });

  //REMOVE ---
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => deleteData({ axiosInstance, url, id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["removeData"] }),
  });

  return {
    getQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export default useApi;
