// api/patients/index.js
import { getConnection } from '../utils/db.js';

export default async function handler(req, res) {
  // CORS headers para frontend
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const connection = await getConnection();
  
  try {
    switch (req.method) {
      case 'GET':
        const [patients] = await connection.execute(
          'SELECT id, name, email, phone, birth_date, created_at FROM patients ORDER BY created_at DESC'
        );
        res.status(200).json({ success: true, data: patients });
        break;

      case 'POST':
        const { name, email, phone, birth_date } = req.body;
        
        if (!name) {
          return res.status(400).json({ success: false, error: 'Name is required' });
        }

        const [result] = await connection.execute(
          'INSERT INTO patients (name, email, phone, birth_date) VALUES (?, ?, ?, ?)',
          [name, email, phone, birth_date]
        );
        
        res.status(201).json({ 
          success: true, 
          data: { 
            id: result.insertId, 
            name, email, phone, birth_date 
          } 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Aiven API Error:', error);
    
    // Manejo específico de errores de Aiven
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({ success: false, error: 'Email already exists' });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Database error',
      message: error.message 
    });
  } finally {
    await connection.end();
  }
}