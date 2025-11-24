import { getConnection } from './utils/db.js';

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const connection = await getConnection();
  
  try {
    if (req.method === 'GET') {
      const [patients] = await connection.execute(
        'SELECT Id as id, Nombre as name, Email as email, Telefono as phone, FechaNacimiento as birth_date, FechaRegistro as created_at FROM Pacientes ORDER BY FechaRegistro DESC'
      );
      res.status(200).json({ success: true, data: patients });
    }
    else if (req.method === 'POST') {
      const { name, email, phone, birth_date } = req.body;
      const [result] = await connection.execute(
        'INSERT INTO Pacientes (Nombre, Email, Telefono, FechaNacimiento) VALUES (?, ?, ?, ?)',
        [name, email, phone, birth_date]
      );
      res.status(201).json({ success: true, data: { id: result.insertId } });
    }
    else {
      res.status(405).json({ success: false, error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ success: false, error: error.message });
  } finally {
    await connection.end();
  }
}