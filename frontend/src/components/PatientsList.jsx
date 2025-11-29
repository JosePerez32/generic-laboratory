// frontend/src/components/PatientsList.jsx
import { usePatients } from '../hooks/usePatients';
import { User, Mail, Phone, Calendar, Plus, Loader2, AlertCircle, Eye, Edit, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { PatientForm } from './PatientForm';

export function PatientsList() {
  const { patients, loading, error, createPatient, updatePatient, deletePatient } = usePatients();
  const [showForm, setShowForm] = useState(false);
  const [editingPatient, setEditingPatient] = useState(null);
    const [deletingPatient, setDeletingPatient] = useState(null);
  // Función para manejar el envío del formulario
  const handleFormSubmit = async (formData) => {
    try {
      if (editingPatient) {
        await updatePatient(editingPatient.id, formData);
      } else {
        await createPatient(formData);
      }
      setShowForm(false);
      setEditingPatient(null);
    } catch (err) {
      console.error('Error al guardar el paciente:', err);
    }
  };
  // Si hay un paciente en edición, es edición
  // Función para cancelar
  const handleCancel = () => {
    setShowForm(false);
    setEditingPatient(null);
  };
  // Función para editar
  const handleEdit = (patient) => {
    setEditingPatient(patient);
    setShowForm(true);
  };
  // Función para crear nuevo
  const handleCreate = () => {
    setEditingPatient(null);
    setShowForm(true);
  };
  const handleDelete = async (patientId) => {
    try {
      await deletePatient(patientId);
      setDeletingPatient(null);
    } catch (error) {
      console.error('Error deleting patient:', error);
    }
  };

  if (loading) return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="relative">
        <Loader2 className="w-12 h-12 text-primary-500 animate-spin" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-white rounded-full"></div>
        </div>
      </div>
      <p className="mt-4 text-lg font-medium text-gray-600">Cargando pacientes...</p>
      <p className="text-sm text-gray-500 mt-1">Por favor espere</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
      <div className="flex justify-center mb-3">
        <AlertCircle className="w-12 h-12 text-red-500" />
      </div>
      <h3 className="text-lg font-semibold text-red-800 mb-2">Error al cargar pacientes</h3>
      <p className="text-red-600">{error}</p>
      <button 
        onClick={() => window.location.reload()}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors font-medium"
      >
        Reintentar
      </button>
    </div>
  );
  if (!patients || patients.length === 0) {
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No hay pacientes registrados</h3>
          <p className="text-gray-600 mb-6">
            Comienza agregando el primer paciente a tu sistema de gestión médica.
          </p>
          <button 
            onClick={handleCreate}
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center mx-auto"
          >
            <Plus className="w-5 h-5 mr-2" />
            Agregar Primer Paciente
          </button>
        </div>
      </div>
  }

  return (
  <>
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-white">Gestión de Pacientes</h2>
              <p className="text-primary-100 mt-1">
                Total: {patients.length} paciente{patients.length !== 1 ? 's' : ''}
              </p>
            </div>
            <button 
              onClick={handleCreate}
              className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center"
            >
              <Plus className="w-5 h-5 mr-2" />
              Nuevo Paciente
            </button>
          </div>
        </div>
        
        {/* Lista de pacientes */}
        <div className="divide-y divide-gray-100">
          {patients.map((patient, index) => (
            <div 
              key={patient.id} 
              className="p-8 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-white transition-all duration-300 group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-6 flex-1 min-w-0">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <User className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* Información */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-3 mb-4">
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors truncate">
                        {patient.name}
                      </h3>
                      <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium flex-shrink-0">
                        ID: {patient.id}
                      </span>
                    </div>
                    
                    {/* Detalles */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                      {patient.email && (
                        <div className="flex items-center text-gray-600">
                          <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <Mail className="w-5 h-5 text-blue-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Email</p>
                            <p className="font-medium truncate">{patient.email}</p>
                          </div>
                        </div>
                      )}
                      
                      {patient.phone && (
                        <div className="flex items-center text-gray-600">
                          <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <Phone className="w-5 h-5 text-green-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Teléfono</p>
                            <p className="font-medium">{patient.phone}</p>
                          </div>
                        </div>
                      )}
                      
                      {patient.birth_date && (
                        <div className="flex items-center text-gray-600">
                          <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3 flex-shrink-0">
                            <Calendar className="w-5 h-5 text-purple-500" />
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                            <p className="font-medium">
                              {new Date(patient.birth_date).toLocaleDateString('es-ES')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Estado y fecha */}
                <div className="text-right ml-6 flex-shrink-0">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                    Activo
                  </span>
                  <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                    <p className="font-medium">Registrado</p>
                    <p>{new Date(patient.created_at).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
              </div>
              
              {/* Acciones */}
              <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button 
                  onClick={() => handleEdit(patient)}
                  className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors flex items-center"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Ver detalles
                </button>
                <button 
                  onClick={() => handleEdit(patient)}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors flex items-center"
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Editar
                </button>
                <button 
                  onClick={() => setDeletingPatient(patient)}
                  className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors flex items-center"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
          <div className="flex justify-between items-center text-sm text-gray-600">
            <div>
              Mostrando <span className="font-semibold">{patients.length}</span> paciente{patients.length !== 1 ? 's' : ''}
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
              Sistema actualizado
            </div>
          </div>
        </div>
      </div>

      {/* Formulario */}
      {showForm && (
        <PatientForm
          patient={editingPatient}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
          loading={false}
        />
      )}

      {/* Modal de confirmación de eliminación */}
      {deletingPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
            <div className="bg-red-500 p-6 rounded-t-2xl">
              <h3 className="text-xl font-bold text-white">¿Eliminar paciente?</h3>
            </div>
            <div className="p-6">
              <p className="text-gray-600 mb-6">
                ¿Estás seguro de que quieres eliminar a <strong>{deletingPatient.name}</strong>? 
                Esta acción no se puede deshacer.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setDeletingPatient(null)}
                  className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-800 py-3 px-4 rounded-lg transition-colors font-medium"
                >
                  Cancelar
                </button>
                <button
                  onClick={() => handleDelete(deletingPatient.id)}
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