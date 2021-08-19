import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401 && error.config.url !== 'sessions') {
        localStorage.removeItem('@GoBarber:token');
        localStorage.removeItem('@GoBarber:user');
        window.location.reload();
      }
    }

    return Promise.reject(error);
  }
);

export default api;
