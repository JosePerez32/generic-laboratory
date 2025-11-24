import { useState } from 'react';
import { PatientForm } from './components/PatientForm';
import { PatientsList } from './components/PatientsList';
import { usePatients } from './hooks/usePatients';

function App() {
  const { createPatient, refresh } = usePatients();
  const [loading, setLoading] = useState(false);

  const handleCreatePatient = async (patientData) => {
    setLoading(true);
    try {
      await createPatient(patientData);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f3f4f6', fontFamily: 'sans-serif' }}>
      <header style={{ backgroundColor: 'white', padding: '1rem', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827' }}>
            🏥 Nelson Labs
          </h1>
        </div>
      </header>

      <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem' }}>
          <div>
            <PatientForm onSubmit={handleCreatePatient} loading={loading} />
          </div>
          <div>
            <PatientsList />
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;