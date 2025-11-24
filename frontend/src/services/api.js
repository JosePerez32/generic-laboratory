import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || '/api';

const api = axios.create({
  baseURL: API_BASE
});

export const patientsService = {
  getAll: () => api.get('/patients'),
  create: (data) => api.post('/patients', data)
};

export const samplesService = {
  getAll: () => api.get('/samples')
};