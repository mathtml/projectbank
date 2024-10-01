// src/api/api.ts

import axios from 'axios';

// Cria uma instância do axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // URL da sua API
});

// Adiciona um interceptador para incluir o token em todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`; // Envia o token no cabeçalho Authorization
  }
  return config;
});

export default api;
