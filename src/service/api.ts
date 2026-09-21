import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://fictional-memory-31a3.onrender.com/api', // Apontando diretamente para o Render com o /api
  headers: {
    'Content-Type': 'application/json',
  },
});