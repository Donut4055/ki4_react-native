import axios from "axios";
import Constants from "expo-constants";

const API_TOKEN = Constants.expoConfig?.extra?.API_TOKEN || process.env.API_TOKEN;
console.log(API_TOKEN);
export const axiosWithEnvToken = axios.create({
  baseURL: "https://nest-api-public.ixe-agent.io.vn/api/v1",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_TOKEN}`
  },
  timeout: 10000,
});

axiosWithEnvToken.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("⚠️ Token đã hết hạn hoặc không hợp lệ");
    }
    return Promise.reject(error);
  }
);
