import axios from "axios";

const baseURL = import.meta.env.DEV 
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_PRO

const api = axios.create({ baseURL });

export default api;