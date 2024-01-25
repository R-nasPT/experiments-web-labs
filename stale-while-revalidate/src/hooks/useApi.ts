import useSWR from "swr";
import axios from "axios";

// import { mutate } from "swr"; <-- mutate แบบนี้ก็ได้ แต่จะต้องใส่ url --> mutate(url)

// const fetcher = async (url: string) => {
//     const response = await axios.get(url);
//     return response.data;
//   };
export const fetcher = (url: string) => axios.get(url).then((res) => res.data);

const useApi = (url: string) => {

  const { data, isLoading, isValidating, error, mutate } = useSWR(`${url}`,fetcher);

  const fetchData = async () => {
    const response = await axios.get(url);
    mutate(); // <-- หรือ mutate(undefined, true) มีค่าเท่ากัน สำหรับ mutate ใน useSWR
    return response.data;
  };

  const insertData = async (body: any) => {
    const response = await axios.post(url, body);
    mutate(); // เรียก API หรือทำการอัพเดตข้อมูล
    return response.data;
  };

  const updateData = async ( id: number | string, body: any) => {
    const response = await axios.put(`${url}/${id}`, body);
    mutate();
    return response.data;
  };

  const removeData = async (id: number | string) => {
    const response = await axios.delete(`${url}/${id}`);
    mutate();
    return response.data;
  };

  return {
    data,
    isLoading,
    isValidating,
    error,
    fetchData,
    insertData,
    updateData,
    removeData,
  };
};

export default useApi;
