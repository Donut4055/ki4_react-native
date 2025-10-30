import axios from "axios";

const BASE_URL = "http://192.168.1.236:3000/api/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 10000,
});