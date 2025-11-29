import { useState } from 'react';
import { PatientForm } from './components/PatientForm';
import { PatientsList } from './components/PatientsList';
import { usePatients } from './hooks/usePatients';
import { FlaskConical, Users, Plus } from 'lucide-react';
import logo from './assets/logo.png';


function App() {
  const { createPatient, refresh } = usePatients();
  const [loading, setLoading] = useState(false);

  const handleCreatePatient = async (patientData) => {
    setLoading(true);
    try {
      await createPatient(patientData);
      await refresh();
    } catch (error) {
      console.error('Error creating patient:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-50"> {/* ← Cambio aquí */}
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              {/* <div className="bg-blue-600 p-2 rounded-lg"> */}
                {/* <FlaskConical className="w-6 h-6 text-white" /> */}
                <img src={logo} alt="Lab Icon" className="w-25 h-10" />
              {/* </div> */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Generic Labs</h1>
                <p className="text-sm text-gray-600">Sistema de Gestión de Laboratorio</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8"> {/* ← Cambio aquí: grid-cols-2 */}
          {/* Sidebar - Patient Form */}
          <div>
            <PatientForm onSubmit={handleCreatePatient} loading={loading} />
          </div>

          {/* Main Content - Patients List */}
          <div>
            <PatientsList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;