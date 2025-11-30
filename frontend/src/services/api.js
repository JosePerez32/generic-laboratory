import axios from 'axios';
// const API_BASE = 'http://localhost:3000/api';
//const API_BASE = 'http://localhost:3000/api' || 'https://idk-five-liard.vercel.app/api';
const API_BASE = import.meta.env.PROD 
  ? 'https://idk-five-liard.vercel.app/api'  // Backend en Vercel
  : 'http://localhost:3000/api';              // Desarrollo local

const api = axios.create({
  baseURL: API_BASE,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
  // Agregar para testing
  withCredentials: false,
});
// // URL DIRECTA - sin proxy complicado
// const API_BASE = 'http://localhost:3000/api';

// const api = axios.create({
//   baseURL: API_BASE,
//   timeout: 10000,
//   headers: {
//     'Content-Type': 'application/json',
//   },
// });

// Interceptor SIMPLIFICADO
api.interceptors.response.use(
  (response) => {
    console.log('✅ API Response:', response.status, response.data);
    return response.data;
  },
  (error) => {
    console.error('❌ API Error:', error.response?.status, error.message);
    
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }
    
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timeout');
    }
    
    throw new Error('Network error - check connection');
  }
);

// export const patientsService = {
//   getAll: () => {
//     console.log('🔄 Fetching patients from:', API_BASE + '/patients');
//     return api.get('/patients');
//   },
export const patientsService = {
  getAll: () => {
    const fullUrl = API_BASE + '/patients';
    console.log('🔍Full URL:', fullUrl);
    return api.get('patients');
  },
  getById: (id) => api.get(`patients/${id}`),
  create: (data) => {
    console.log('🔄 Creating patient:', data);
    return api.post('patients', data);
  },
  update: (id, data) => api.put(`patients/${id}`, data),
  delete: (id) => api.delete(`patients/${id}`),
};

export const samplesService = {
  getAll: () => api.get('/samples'),
  getById: (id) => api.get(`/samples/${id}`),
  create: (data) => api.post('/samples', data),
  update: (id, data) => api.put(`/samples/${id}`, data),
  updateStatus: (id, status) => api.put(`/samples/${id}/status`, { status }),
  updateResult: (id, result) => api.put(`/samples/${id}/result`, { result }),
  delete: (id) => api.delete(`/samples/${id}`),
};