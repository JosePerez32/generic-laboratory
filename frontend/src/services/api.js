// frontend/src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000, // 10 segundos timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    console.error('API Error:', error);
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout - please try again');
    }
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    throw new Error('Network error - please check your connection');
  }
);

export const patientsService = {
  getAll: () => api.get('/patients'),
  getById: (id) => api.get(`/patients/${id}`),
  create: (data) => api.post('/patients', data),
  update: (id, data) => api.put(`/patients/${id}`, data),
  delete: (id) => api.delete(`/patients/${id}`),
};

export const samplesService = {
  getAll: () => api.get('/samples'),
  create: (data) => api.post('/samples', data),
  updateStatus: (id, status) => api.put(`/samples/${id}`, { status }),
  updateResult: (id, result) => api.put(`/samples/${id}/result`, { result }),
};