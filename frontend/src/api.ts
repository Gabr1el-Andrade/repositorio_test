import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8989/api', // URL do backend Laravel rodando no Docker
});

const token = localStorage.getItem('authToken');
if (token) {
  api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

export default api;