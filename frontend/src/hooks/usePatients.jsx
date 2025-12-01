// frontend/src/hooks/usePatients.js
import { useState, useEffect } from 'react';
import { patientsService } from '../services/api.js';

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);



  const loadPatients = async () => {
    console.log('Loading patients...');
    try {
      setLoading(true);
      setError(null);
      console.log('📡 Llamando a patientsService.getAll()');
      const response = await patientsService.getAll([]);
      console.log('📦 Response recibida:', response);

      let patientsData = response.data || response;
      
       // DEBUG: Ver qué devuelve la API
      console.log('🔍 API Response:', response);
      console.log('🔍 Response type:', typeof response);
      setPatients(patientsData.data);
       if (Array.isArray(response)) {
        patientsData = response;
      } else if (response && response.data) {
        patientsData = Array.isArray(response.data) ? response.data : [];
      } else if (response && response.patients) {
        patientsData = Array.isArray(response.patients) ? response.patients : [];
      }
      console.log('✅ Patients data final:', patientsData);
      setPatients(patientsData);
    } catch (err) {
      setError(err.message);
      setError(err.message || 'Error desconocido');
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    loadPatients();
  }, []);

  const createPatient = async (patientData) => {
    try {
      const response = await patientsService.create(patientData);
      const patientsData = response.data || response;

      setPatients(prev => [...prev, patientsData.data]);
      return patientsData.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return {
    patients: patients || [],
    loading,
    error,
    createPatient,
    refresh: loadPatients
  };
}