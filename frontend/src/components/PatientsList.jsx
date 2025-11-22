// frontend/src/components/PatientsList.jsx
import { usePatients } from '../hooks/usePatients';
import { user, mail, phone, calendar } from 'lucide-react';

export function PatientsList() {
  const { patients, loading, error } = usePatients();

  if (loading) return <div className="text-center py-8">Cargando pacientes...</div>;
  if (error) return <div className="text-red-600 text-center py-8">Error: {error}</div>;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">Lista de Pacientes</h2>
        <p className="text-gray-600 text-sm">
          Total: {patients.length} paciente(s)
        </p>
      </div>
      
      <div className="divide-y divide-gray-200">
        {patients.map(patient => (
          <div key={patient.id} className="p-6 hover:bg-gray-50 transition-colors">
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <user className="w-6 h-6 text-blue-600" />
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {patient.name}
                  </h3>
                  
                  <div className="mt-2 space-y-1">
                    {patient.email && (
                      <div className="flex items-center text-sm text-gray-600">
                        <mail className="w-4 h-4 mr-2" />
                        {patient.email}
                      </div>
                    )}
                    
                    {patient.phone && (
                      <div className="flex items-center text-sm text-gray-600">
                        <phone className="w-4 h-4 mr-2" />
                        {patient.phone}
                      </div>
                    )}
                    
                    {patient.birth_date && (
                      <div className="flex items-center text-sm text-gray-600">
                        <calendar className="w-4 h-4 mr-2" />
                        Nacimiento: {new Date(patient.birth_date).toLocaleDateString()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <span className="inline-block px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                  Activo
                </span>
                <p className="text-xs text-gray-500 mt-1">
                  Registrado: {new Date(patient.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {patients.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No hay pacientes registrados
        </div>
      )}
    </div>
  );
}