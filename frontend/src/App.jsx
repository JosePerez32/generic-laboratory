import { useState } from 'react';
import { PatientForm } from './components/PatientForm';
import { PatientsList } from './components/PatientsList';
import { usePatients } from './hooks/usePatients';
import { Beaker, Users, Plus } from 'lucide-react';
import logo from './assets/logo.png';
import { SamplesList } from './components/SamplesList';

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

//   return (
//     <div className="min-h-screen min-w-screen bg-gray-50"> {/* ← Cambio aquí */}
//       {/* Header */}
//       <header className="bg-white shadow-sm border-b">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <div className="flex items-center justify-between h-16">
//             <div className="flex items-center space-x-3">
//               {/* <div className="bg-blue-600 p-2 rounded-lg"> */}
//                 {/* <BeakerConical className="w-6 h-6 text-white" /> */}
//                 <img src={logo} alt="Lab Icon" className="w-25 h-10" />
//               {/* </div> */}
//               <div>
//                 <h1 className="text-2xl font-bold text-gray-900">Generic Labs</h1>
//                 <p className="text-sm text-gray-600">Sistema de Gestión de Laboratorio</p>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* Main Content */}
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         <div className="grid grid-cols-1 xl:grid-cols-2 gap-8"> {/* ← Cambio aquí: grid-cols-2 */}
//           {/* Sidebar - Patient Form */}
//           <div>
//             <PatientForm onSubmit={handleCreatePatient} loading={loading} />
//           </div>

//           {/* Main Content - Patients List */}
//           <div>
//             <PatientsList />
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// // export default App;
// function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-3">
              {/* <div className="w-10 h-10 bg-gradient-to-r from-primary-600 to-purple-600 rounded-lg flex items-center justify-center"> */}
                <img src={logo} alt="Lab Icon" className="w-35 h-10" />
                {/* <Beaker className="w-6 h-6 text-white" /> */}
              {/* </div> */}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">MediTrack Lab</h1>
                <p className="text-gray-600 text-sm">Sistema de Gestión de Laboratorio</p>
              </div>
            </div>
            <nav className="flex space-x-8">
              <a href="#pacientes" className="flex items-center space-x-2 text-primary-600 font-medium">
                <Users className="w-5 h-5" />
                <span>Pacientes</span>
              </a>
              <a href="#muestras" className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium">
                <Beaker className="w-5 h-5" />
                <span>Muestras</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* Pacientes */}
          <section id="pacientes">
            <PatientsList />
          </section>

          {/* Muestras */}
          <section id="muestras">
            <SamplesList />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;