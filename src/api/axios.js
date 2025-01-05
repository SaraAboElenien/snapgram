// import axios from "axios";

// const baseURL = import.meta.env.DEV 
//   ? import.meta.env.VITE_API_URL_DEV
//   : import.meta.env.VITE_API_URL_PRO

// const api = axios.create({ baseURL });

// export default api;

import axios from "axios";

const baseURL = import.meta.env.DEV 
  ? import.meta.env.VITE_API_URL_DEV
  : import.meta.env.VITE_API_URL_PRO;

console.log('Current API Base URL:', baseURL);

const api = axios.create({ 
  baseURL,
  timeout: 15000, 
  headers: {
    'Content-Type': 'application/json',
  }
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('userToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    console.log('API Request:', {
      url: `${config.baseURL}${config.url}`,
      method: config.method,
      headers: config.headers,
    });
    
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log('API Response Success:', {
      url: response.config.url,
      status: response.status,
      data: response.data
    });
    return response;
  },
  (error) => {
    console.error('API Response Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

export default api;