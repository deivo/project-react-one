import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:7001';
axios.defaults.headers.post['Content-Type'] = "application/json;charset=utf8";
// 请求拦截器
axios.interceptors.request.use((config) => {
  const token = sessionStorage.getItem('token');
  config.headers = config.headers || {};
  config.headers['Authorization'] = `Bearer ${token}`;
  return config;
}, (error) => {
  return Promise.reject(error);
})

// 响应拦截器
axios.interceptors.response.use((res) => res.data, (error) => Promise.reject(error))

export default axios