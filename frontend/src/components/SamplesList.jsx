// frontend/src/components/SamplesList.jsx
import { useState } from 'react';
import { useSamples } from '../hooks/useSamples';
import { SampleForm } from './SampleForm';
import { Beaker, Plus, Loader2, AlertCircle, Edit, Trash2, Play, Check, FileText } from 'lucide-react';

export function SamplesList() {
  const { samples, loading, error, createSample, updateSampleStatus, updateSampleResult, deleteSample } = useSamples();
  const [showForm, setShowForm] = useState(false);
  const [editingSample, setEditingSample] = useState(null);
  const [deletingSample, setDeletingSample] = useState(null);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  const handleFormSubmit = async (formData) => {
    try {
      if (editingSample) {
        await updateSample(editingSample.id, formData);
      } else {
        await createSample(formData);
      }
      setShowForm(false);
      setEditingSample(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleStatusUpdate = async (sampleId, newStatus) => {
    setUpdatingStatus(sampleId);
    try {
      await updateSampleStatus(sampleId, newStatus);
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setUpdatingStatus(null);
    }
  };

  const handleResultUpdate = async (sampleId, result) => {
    try {
      await updateSampleResult(sampleId, result);
    } catch (error) {
      console.error('Error updating result:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pendiente': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'procesando': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completado': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getResultColor = (result) => {
    switch (result) {
      case 'positivo': return 'text-red-600 bg-red-50 border-red-200';
      case 'negativo': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
      <p className="mt-4 text-lg font-medium text-gray-600">Cargando muestras...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar muestras</h3>
      <p className="text-red-600">{error}</p>
    </div>
  );

  return (
    <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-purple-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Beaker className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white">Gestión de Muestras</h2>
                <p className="text-purple-100 mt-1">
                  Total: {samples.length} muestra{samples.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nueva Muestra
            </button>
          </div>
        </div>

        {/* Lista de Muestras */}
        <div className="divide-y divide-gray-100">
          {samples.map((sample) => (
            <div key={sample.id} className="p-6 hover:bg-gray-50 transition-colors group">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4 flex-1">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Beaker className="w-6 h-6 text-purple-600" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">
                        Muestra #{sample.id}
                      </h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(sample.status)}`}>
                        {sample.status}
                      </span>
                      {sample.result && (
                        <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getResultColor(sample.result)}`}>
                          {sample.result}
                        </span>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Paciente</p>
                        <p className="font-medium">{sample.patient_name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Tipo de Muestra</p>
                        <p className="font-medium">{sample.type}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Fecha de Toma</p>
                        <p className="font-medium">
                          {new Date(sample.collection_date).toLocaleDateString('es-ES')}
                        </p>
                      </div>
                    </div>

                    {sample.notes && (
                      <div className="mt-3">
                        <p className="text-gray-500 text-sm">Notas</p>
                        <p className="text-gray-700">{sample.notes}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Acciones */}
                <div className="flex flex-col space-y-2 ml-4 flex-shrink-0">
                  {sample.status === 'pendiente' && (
                    <button
                      onClick={() => handleStatusUpdate(sample.id, 'procesando')}
                      disabled={updatingStatus === sample.id}
                      className="flex items-center px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      {updatingStatus === sample.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Play className="w-4 h-4 mr-1" />
                      )}
                      Iniciar
                    </button>
                  )}
                  
                  {sample.status === 'procesando' && (
                    <button
                      onClick={() => handleStatusUpdate(sample.id, 'completado')}
                      disabled={updatingStatus === sample.id}
                      className="flex items-center px-3 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg text-sm font-medium transition-colors"
                    >
                      {updatingStatus === sample.id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Check className="w-4 h-4 mr-1" />
                      )}
                      Completar
                    </button>
                  )}

                  {sample.status === 'completado' && !sample.result && (
                    <div className="flex space-x-1">
                      <button
                        onClick={() => handleResultUpdate(sample.id, 'positivo')}
                        className="flex-1 px-2 py-1 bg-red-500 hover:bg-red-600 text-white rounded text-xs font-medium transition-colors"
                      >
                        Pos
                      </button>
                      <button
                        onClick={() => handleResultUpdate(sample.id, 'negativo')}
                        className="flex-1 px-2 py-1 bg-green-500 hover:bg-green-600 text-white rounded text-xs font-medium transition-colors"
                      >
                        Neg
                      </button>
                    </div>
                  )}

                  <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => setEditingSample(sample)}
                      className="p-2 text-gray-600 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeletingSample(sample)}
                      className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {samples.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Beaker className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p>No hay muestras registradas</p>
          </div>
        )}
      </div>

      {/* Formulario de Muestra */}
      {showForm && (
        <SampleForm
          sample={editingSample}
          onSubmit={handleFormSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditingSample(null);
          }}
        />
      )}

      {/* Modal de Confirmación de Eliminación */}
      {deletingSample && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-red-500 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white">¿Eliminar muestra?</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres eliminar la muestra <strong>#{deletingSample.id}</strong> del paciente <strong>{deletingSample.patient_name}</strong>?
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeletingSample(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={async () => {
                    await deleteSample(deletingSample.id);
                    setDeletingSample(null);
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}