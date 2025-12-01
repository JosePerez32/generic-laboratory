// frontend/src/hooks/useSamples.js
import { useState, useEffect } from 'react';
import { samplesService } from '../services/api';

export function useSamples() {
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadSamples = async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading samples...');
      const response = await samplesService.getAll();
      console.log('📦 Samples response:', response);
      
      // Manejar diferentes formatos de respuesta
      let samplesData = [];
      
      if (Array.isArray(response)) {
        samplesData = response;
      } else if (response && response.data && Array.isArray(response.data)) {
        samplesData = response.data;
      } else if (response && response.samples && Array.isArray(response.samples)) {
        samplesData = response.samples;
      } else if (response && response.success && Array.isArray(response.data)) {
        samplesData = response.data;
      }
      
      console.log('✅ Samples data final:', samplesData);
      setSamples(samplesData);
      
    } catch (err) {
      console.error('❌ Error loading samples:', err);
      setError(err.message || 'Error al cargar muestras');
      setSamples([]);
    } finally {
      setLoading(false);
    }
  };

  const createSample = async (sampleData) => {
    try {
      console.log('➕ Creating sample:', sampleData);
      const response = await samplesService.create(sampleData);
      
      // Manejar diferentes formatos de respuesta
      const newSample = response.data || response;
      
      setSamples(prev => [...prev, newSample]);
      console.log('✅ Sample created:', newSample);
      return newSample;
      
    } catch (err) {
      console.error('❌ Error creating sample:', err);
      setError(err.message);
      throw err;
    }
  };

  const updateSample = async (id, sampleData) => {
    try {
      console.log('✏️ Updating sample:', id, sampleData);
      const response = await samplesService.update(id, sampleData);
      
      const updatedSample = response.data || response;
      
      setSamples(prev => prev.map(s => s.id === id ? updatedSample : s));
      console.log('✅ Sample updated:', updatedSample);
      return updatedSample;
      
    } catch (err) {
      console.error('❌ Error updating sample:', err);
      setError(err.message);
      throw err;
    }
  };

  const updateSampleStatus = async (id, status) => {
    try {
      console.log('🔄 Updating sample status:', id, status);
      const response = await samplesService.updateStatus(id, { status });
      
      const updatedSample = response.data || response;
      
      setSamples(prev => prev.map(s => s.id === id ? updatedSample : s));
      console.log('✅ Status updated:', updatedSample);
      return updatedSample;
      
    } catch (err) {
      console.error('❌ Error updating status:', err);
      setError(err.message);
      throw err;
    }
  };

  const updateSampleResult = async (id, result) => {
    try {
      console.log('📊 Updating sample result:', id, result);
      const response = await samplesService.updateResult(id, { result });
      
      const updatedSample = response.data || response;
      
      setSamples(prev => prev.map(s => s.id === id ? updatedSample : s));
      console.log('✅ Result updated:', updatedSample);
      return updatedSample;
      
    } catch (err) {
      console.error('❌ Error updating result:', err);
      setError(err.message);
      throw err;
    }
  };

  const deleteSample = async (id) => {
    try {
      console.log('🗑️ Deleting sample:', id);
      await samplesService.delete(id);
      
      setSamples(prev => prev.filter(s => s.id !== id));
      console.log('✅ Sample deleted:', id);
      
    } catch (err) {
      console.error('❌ Error deleting sample:', err);
      setError(err.message);
      throw err;
    }
  };

  useEffect(() => {
    loadSamples();
  }, []);

  console.log('🎯 useSamples returning:', { 
    samplesCount: samples?.length || 0, 
    loading, 
    error 
  });

  return {
    samples: samples || [],
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