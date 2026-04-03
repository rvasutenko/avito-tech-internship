import axios from "axios";
import { ApiError } from "./ApiError";

export const api = axios.create({
  baseURL: "http://localhost:8080",
});

api.interceptors.response.use(
  (res) => res,
  (error) => {
    const message =
      error.response?.data?.message || error.message || "Что-то пошло не так";

    const status = error.response?.status;

    return Promise.reject(new ApiError(message, status));
  }
);
