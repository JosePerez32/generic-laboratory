import { useState, useEffect } from 'react';
import { Beaker, X, Save, User, Calendar, FileText } from 'lucide-react';

export function SampleForm({ sample, onSubmit, onCancel, loading = false }) {
  const [formData, setFormData] = useState({
    patient_id: '',
    type: '',
    collection_date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  useEffect(() => {
    if (sample) {
      setFormData({
        patient_id: sample.patient_id || '',
        type: sample.type || '',
        collection_date: sample.collection_date ? sample.collection_date.split('T')[0] : new Date().toISOString().split('T')[0],
        notes: sample.notes || ''
      });
    }
  }, [sample]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const sampleTypes = [
    'Sangre',
    'Orina', 
    'Heces',
    'Saliva',
    'Tejido',
    'Líquido cefalorraquídeo',
    'Otro'
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {sample ? 'Editar Muestra' : 'Nueva Muestra'}
                </h2>
                <p className="text-purple-100 text-sm">
                  {sample ? 'Actualiza la información de la muestra' : 'Registra una nueva muestra de laboratorio'}
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className="text-white/80 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>
        
        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* ID del Paciente */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ID del Paciente *
            </label>
            <div className="relative">
              <User className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="number"
                name="patient_id"
                required
                value={formData.patient_id}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
                placeholder="Ej: 123"
              />
            </div>
          </div>

          {/* Tipo de Muestra */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tipo de Muestra *
            </label>
            <div className="relative">
              <Beaker className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <select
                name="type"
                required
                value={formData.type}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all appearance-none"
              >
                <option value="">Seleccionar tipo...</option>
                {sampleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fecha de Toma */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Fecha de Toma *
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <input
                type="date"
                name="collection_date"
                required
                value={formData.collection_date}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          {/* Notas */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Notas
            </label>
            <div className="relative">
              <FileText className="w-5 h-5 text-gray-400 absolute left-3 top-3" />
              <textarea
                name="notes"
                rows="3"
                value={formData.notes}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all resize-none"
                placeholder="Observaciones adicionales..."
              />
            </div>
          </div>

          {/* Botones */}
          <div className="flex space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="flex-1 bg-gray-300 hover:bg-gray-400 disabled:bg-gray-200 text-gray-800 py-3 px-4 rounded-lg transition-colors font-medium"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 bg-purple-500 hover:bg-purple-600 disabled:bg-purple-300 text-white py-3 px-4 rounded-lg transition-colors font-medium flex items-center justify-center"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  {sample ? 'Actualizar' : 'Crear'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}