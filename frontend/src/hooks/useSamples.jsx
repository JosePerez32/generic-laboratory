import { useState, useEffect } from 'react';
import { samplesService } from '../services/api';

export function useSamples() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSamples = async () => {
    try {
      setLoading(true);
      const data = await samplesService.getAll();
      setSamples(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createSample = async (sampleData) => {
    try {
      const newSample = await samplesService.create(sampleData);
      setSamples(prev => [...prev, newSample]);
      return newSample;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSample = async (id, sampleData) => {
    try {
      const updatedSample = await samplesService.update(id, sampleData);
      setSamples(prev => prev.map(s => s.id === id ? updatedSample : s));
      return updatedSample;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSampleStatus = async (id, status) => {
    try {
      const updatedSample = await samplesService.updateStatus(id, status);
      setSamples(prev => prev.map(s => s.id === id ? updatedSample : s));
      return updatedSample;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updateSampleResult = async (id, result) => {
    try {
      const updatedSample = await samplesService.updateResult(id, result);
      setSamples(prev => prev.map(s => s.id === id ? updatedSample : s));
      return updatedSample;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const deleteSample = async (id) => {
    try {
      await samplesService.delete(id);
      setSamples(prev => prev.filter(s => s.id !== id));
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadSamples();
  }, []);

  return {
    samples,
    loading,
    error,
    createSample,
    updateSample,
    updateSampleStatus,
    updateSampleResult,
    deleteSample,
    refetch: loadSamples
  };
}