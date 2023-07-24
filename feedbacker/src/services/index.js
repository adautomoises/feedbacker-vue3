import axios from "axios";
import router from "@/router";
import AuthService from "./auth";
import UsersService from "./users";
import { setGlobalLoading } from "../store/global";

const API_ENVS = {
  production: "",
  development: "",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
  validateStatus: (status) => status < 500,
});

httpClient.interceptors.request.use((config) => {
  setGlobalLoading(true);
  const token = window.localStorage.getItem("@feedbacker:token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => {
    setGlobalLoading(false);
    return response;
  },
  (error) => {
    const canThrowAnError = error.status === 0 || error.status === 500;
    if (canThrowAnError) {
      setGlobalLoading(false);
      throw new Error(error.message);
    }
    if (error.status === 401) {
      router.push({ path: "/" });
    }

    setGlobalLoading(false);
    return error;
  }
);

export default {
  auth: AuthService(httpClient),
  users: UsersService(httpClient),
};
