// api/samples/index.js
import { getConnection } from '../utils/db.js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const connection = await getConnection();
  
  try {
    switch (req.method) {
      case 'GET':
        const [samples] = await connection.execute(`
          SELECT 
            s.id,
            s.patient_id,
            s.analysis_type_id,
            s.collection_date,
            s.status,
            s.result,
            s.result_date,
            p.name as patient_name,
            p.email as patient_email,
            at.name as analysis_name,
            at.price as analysis_price
          FROM samples s
          LEFT JOIN patients p ON s.patient_id = p.id
          LEFT JOIN analysis_types at ON s.analysis_type_id = at.id
          ORDER BY s.collection_date DESC
        `);
        res.status(200).json({ success: true, data: samples });
        break;

      case 'POST':
        const { patient_id, analysis_type_id, status = 'pending' } = req.body;
        
        // Validaciones
        if (!patient_id || !analysis_type_id) {
          return res.status(400).json({ 
            success: false, 
            error: 'patient_id and analysis_type_id are required' 
          });
        }

        const [result] = await connection.execute(
          'INSERT INTO samples (patient_id, analysis_type_id, status) VALUES (?, ?, ?)',
          [patient_id, analysis_type_id, status]
        );
        
        res.status(201).json({ 
          success: true, 
          data: { 
            id: result.insertId, 
            patient_id, 
            analysis_type_id, 
            status 
          } 
        });
        break;

      default:
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Aiven Samples Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database error',
      message: error.message 
    });
  } finally {
    await connection.end();
  }
}