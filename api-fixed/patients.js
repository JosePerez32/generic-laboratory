// api/patients.js - DEBE exportar una función HTTP
export default function handler(req, res) {
  // Configurar CORS primero
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  // Manejar preflight OPTIONS
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  // Tu lógica de API aquí
  if (req.method === 'GET') {
    // Devolver datos de pacientes
    res.status(200).json([{ id: 1, name: 'Paciente Ejemplo' }]);
  }
  
  if (req.method === 'POST') {
    // Crear paciente
    res.status(201).json({ message: 'Paciente creado' });
  }
}