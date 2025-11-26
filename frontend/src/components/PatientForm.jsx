// frontend/src/components/PatientsList.jsx
import { usePatients } from '../hooks/usePatients';
import { User, Mail, Phone, Calendar, Plus, Loader2, AlertCircle } from 'lucide-react';

export function PatientsList() {
  const { patients, loading, error } = usePatients();

  // Estados de carga y error con mejor diseño
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
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-12 text-center">
        <div className="max-w-md mx-auto">
          <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <User className="w-10 h-10 text-primary-500" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 mb-3">No hay pacientes registrados</h3>
          <p className="text-gray-600 mb-6">
            Comienza agregando el primer paciente a tu sistema de gestión médica.
          </p>
          <button className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center mx-auto">
            <Plus className="w-5 h-5 mr-2" />
            Agregar Primer Paciente
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      {/* Header mejorado */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-white">Gestión de Pacientes</h2>
            <p className="text-primary-100 mt-1">
              Total: {patients.length} paciente{patients.length !== 1 ? 's' : ''}
            </p>
          </div>
          <button className="bg-white/20 hover:bg-white/30 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 backdrop-blur-sm border border-white/20 hover:border-white/30 flex items-center">
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
            className="p-8 hover:bg-gradient-to-r hover:from-primary-50/50 hover:to-white transition-all duration-300 group cursor-pointer"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-6">
                {/* Avatar del paciente */}
                <div className="relative">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <User className="w-8 h-8 text-white" />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                {/* Información del paciente */}
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-3">
                    <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors">
                      {patient.name}
                    </h3>
                    <span className="px-3 py-1 bg-primary-100 text-primary-700 rounded-full text-sm font-medium">
                      ID: {patient.id}
                    </span>
                  </div>
                  
                  {/* Detalles */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {patient.email && (
                      <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                        <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-3">
                          <Mail className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Email</p>
                          <p className="font-medium">{patient.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {patient.phone && (
                      <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                        <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mr-3">
                          <Phone className="w-5 h-5 text-green-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Teléfono</p>
                          <p className="font-medium">{patient.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {patient.birth_date && (
                      <div className="flex items-center text-gray-600 group-hover:text-gray-700 transition-colors">
                        <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mr-3">
                          <Calendar className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Fecha de Nacimiento</p>
                          <p className="font-medium">
                            {new Date(patient.birth_date).toLocaleDateString('es-ES', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {/* Estado y fecha de registro */}
              <div className="text-right ml-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-green-100 to-green-50 text-green-700 border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  Activo
                </span>
                <div className="mt-3 text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  <p className="font-medium">Registrado</p>
                  <p>{new Date(patient.created_at).toLocaleDateString('es-ES', {
                    year: 'numeric',
                    month: 'short',
                    day: 'numeric'
                  })}</p>
                </div>
              </div>
            </div>
            
            {/* Acciones rápidas */}
            <div className="flex justify-end space-x-3 mt-6 pt-6 border-t border-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button className="px-4 py-2 text-sm font-medium text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-lg transition-colors">
                Ver detalles
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-700 hover:bg-gray-50 rounded-lg transition-colors">
                Editar
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors">
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {/* Footer con estadísticas */}
      <div className="bg-gray-50 px-8 py-4 border-t border-gray-100">
        <div className="flex justify-between items-center text-sm text-gray-600">
          <p>
            Mostrando <span className="font-semibold">{patients.length}</span> paciente{patients.length !== 1 ? 's' : ''}
          </p>
          <p className="flex items-center">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Sistema actualizado
          </p>
        </div>
      </div>
    </div>
  );
}