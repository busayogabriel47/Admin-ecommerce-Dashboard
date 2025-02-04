import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true // Allows cookies (for refresh token)
});

// Request interceptor to attach token
API.interceptors.request.use(
    async (config) => {
        let auth = localStorage.getItem('auth');
        if (auth) {
            auth = JSON.parse(auth);
            config.headers.Authorization = `Bearer ${auth.token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);



// Response interceptor to refresh token on 401 errors
API.interceptors.response.use(
  (response) => response,
  async (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          try {
              const { data } = await API.post('/refresh-token');
              const auth = JSON.parse(localStorage.getItem('auth'));

              auth.token = data.token;
              localStorage.setItem('auth', JSON.stringify(auth));

              API.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
              return API(originalRequest);
          } catch (err) {
              console.error('Refresh token failed', err);
              localStorage.removeItem('auth');
              window.location.href = '/signin';
          }
      }

      return Promise.reject(error);
  }
);
  

export default API;
