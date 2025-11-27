// components/PatientCard.jsx
export const PatientCard = ({ patient, onEdit, onDelete }) => (
  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-primary-200 p-6">
    <div className="flex justify-between items-start mb-4">
      <div>
        <h3 className="text-xl font-bold text-gray-800">{patient.name}</h3>
        <p className="text-gray-600 mt-1">{patient.email || 'Sin email'}</p>
      </div>
      <span className="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm font-medium">
        ID: {patient.id}
      </span>
    </div>
    
    <div className="grid grid-cols-2 gap-6 mb-4">
      <div>
        <p className="text-sm text-gray-500">Edad</p>
        <p className="font-semibold">{patient.age || 'N/A'} años</p>
      </div>
      <div>
        <p className="text-sm text-gray-500">Teléfono</p>
        <p className="font-semibold">{patient.phone || 'N/A'}</p>
      </div>
    </div>
    
    <div className="flex space-x-3">
      <button
        onClick={() => onEdit(patient)}
        className="flex-1 bg-primary-500 hover:bg-primary-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
        </svg>
        Editar
      </button>
      <button
        onClick={() => onDelete(patient.id)}
        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg transition-colors duration-200 font-medium flex items-center justify-center"
      >
        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
        Eliminar
      </button>
    </div>
  </div>
);