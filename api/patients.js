// api/patients.js
import pool from './utils/db.js';

export default async function handler(req, res) {
  // Headers CORS
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    switch (req.method) {
      case 'GET':
        const [patients] = await pool.query(
          'SELECT Id as id, Nombre as name, Email as email, Telefono as phone, FechaNacimiento as birth_date, FechaRegistro as created_at FROM pacientes ORDER BY FechaRegistro DESC'
        );
        return res.status(200).json(patients);

      case 'POST':
        const { name, email, phone, birth_date } = req.body;
        
        if (!name) {
          return res.status(400).json({ error: 'Name is required' });
        }

        const [result] = await pool.query(
          'INSERT INTO pacientes (Nombre, Email, Telefono, FechaNacimiento) VALUES (?, ?, ?, ?)',
          [name, email || null, phone || null, birth_date || null]
        );
        
        return res.status(201).json({ 
          id: result.insertId, 
          name, 
          email, 
          phone, 
          birth_date 
        });

      default:
        return res.status(405).json({ error: `Method ${req.method} not allowed` });
    }
  } catch (error) {
    console.error('Database error:', error);
    
    // Manejo específico de errores
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ error: 'Email already exists' });
    }
    
    return res.status(500).json({ 
      error: 'Database error',
      message: error.message 
    });
  }
}