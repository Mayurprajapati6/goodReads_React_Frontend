import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: '/api/v1',  // Use relative URL to work with your Vite proxy
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add response interceptor for better error handling
axiosInstance.interceptors.response.use(
  response => response,
  error => {
    // Handle network errors better
    if (!error.response) {
      console.error('Network error detected');
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;