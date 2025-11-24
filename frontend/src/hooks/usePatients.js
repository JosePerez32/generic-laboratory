import { useState, useEffect } from 'react';
import { patientsService } from '../services/api';

export function usePatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const response = await patientsService.getAll();
      setPatients(response.data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPatient = async (patientData) => {
    try {
      const response = await patientsService.create(patientData);
      await loadPatients();
      return response.data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  return { patients, loading, error, createPatient, refresh: loadPatients };
}