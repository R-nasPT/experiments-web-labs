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
const createData = async ({
  axiosInstance,
  url,
  newData,
}: AxiosParams): Promise<any> => {
  const { data } = await axiosInstance.post(`/${url}`, newData);
  return data;
};

// AXIOS PUT ---
const updateData = async ({
  axiosInstance,
  url,
  newData,
  id,
}: AxiosParams): Promise<any> => {
  const endpoint = id ? `/${url}/${id}` : `/${url}`;
  const { data } = await axiosInstance.put(endpoint, newData);
  return data;
};

// AXIOS DELETE ---
const deleteData = async ({
  axiosInstance,
  url,
  id,
}: AxiosParams): Promise<any> => {
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
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["insertData"] }),
  });

  //EDIT ---
  const updateMutation = useMutation({
    //-- id จะระบุหรือไม่ก็ได้
    mutationFn: ({ id, newData }: { id?: number | string; newData: any }) =>
      updateData({ axiosInstance, url, newData, id }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["editData"] }),
  });

  //REMOVE ---
  const deleteMutation = useMutation({
    mutationFn: (id: number | string) => deleteData({ axiosInstance, url, id }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["removeData"] }),
  });

  //EDIT special ---
  const updateMutationspecial = useMutation({
    mutationFn: ({ id, newData }: { id?: number | string; newData: any }) =>
      updateData({ axiosInstance, url, newData, id }),
    onSuccess: (data, variables) => {
      // อัพเดตข้อมูลในแคชด้วย queryClient.setQueryData
      if (variables.id) {
        // หากมี id ระบุ ให้อัพเดตข้อมูลที่มี id นั้น
        const prevData = queryClient.getQueryData(["fetchData"]) as any[];
        const updatedData = prevData.map((item) =>
          item.id === variables.id ? { ...item, ...variables.newData } : item
        );
        queryClient.setQueryData(["fetchData"], updatedData);
      } else {
        // หากไม่มี id ระบุ ให้อัพเดตข้อมูลทั้งหมด
        queryClient.invalidateQueries({ queryKey: ["fetchData"] });
      }
    },
  });

  return {
    getQuery,
    createMutation,
    updateMutation,
    deleteMutation,
  };
}

export default useApi;

// invalidateQueries ไว้ใช้เพื่ออัพเดตข้อมูลในแคชหรือรีเฟรชข้อมูลขึ้นมาใหม่ทั้งหมด โดยใส่ queryKey ของ query ที่ต้องการอัพเดต
// queryClient.invalidateQueries({ queryKey: ["fetchData"] });

// setQueryData ไว้ใช้เพื่ออัพเดตข้อมูลในแคชหรือรีเฟรชข้อมูลขึ้นมาใหม่เฉพาะตัวนั้นตัวเดียว โดยใส่ queryKey ของ query ที่ต้องการอัพเดต และต่อด้วยข้อมูลที่ต้องการอัพเดต
// queryClient.setQueryData(["fetchData"], payload);

// ------------------------EXAMPLE---------------------------
// const payload = {           <----- ข้อมูลที่ต้องการอัพเดต
//   condition: formData.condition,
//   defectUpload,
//   details,
//   imgUpload,
//   price: formData.price,
//   shipping_from: order?.address,
//   size: formData.size,
//   year: formData.year,
//   international: order?.order?.international,
// }

// updateOrder(payload, {
//   onSuccess: (data: { status: number }) => {
//     if (data.status === 200) {
//       queryClient.setQueryData('myOrderSelling', payload) <--- อัพเดตข้อมูลในแคชด้วย payload
//       refetch()
//       onClose()
//     }
//   },
//   onError: (error: any) => {
//     console.log('error', error)
//   },
// }