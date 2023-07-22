import axios from "axios";
import AuthService from "./auth";

const API_ENVS = {
  production: "",
  development: "",
  local: "http://localhost:3000",
};

const httpClient = axios.create({
  baseURL: API_ENVS.local,
  validateStatus: (status) => status < 500,
});

// httpClient.interceptors.response.use(
//   (response) => response,
//   (error) => {
//     const canThrowAnError =
//       error.response.status === 0 || error.response.status === 500;

//     if (canThrowAnError) {
//       throw new Error(error);
//     }

//     throw error;
//   }
// );

export default {
  auth: AuthService(httpClient),
};
