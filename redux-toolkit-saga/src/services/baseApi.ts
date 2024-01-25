import axios from "axios";

const baseApi = axios.create({
  baseURL: "http://localhost:2077",
  // timeout: 1000, // กำหนด timeout สำหรับการเรียก API
});

export default baseApi;
