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
        // GET samples - REEMPLAZA la consulta:
      const [samples] = await connection.execute(`
        SELECT 
          s.Id as id,
          s.PacienteId as patient_id,
          s.TipoAnalisisId as analysis_type_id,
          s.FechaToma as collection_date,
          s.Estado as status,
          s.Resultado as result,
          s.FechaResultado as result_date,
          p.Nombre as patient_name,
          p.Email as patient_email,
          ta.Nombre as analysis_name,
          ta.Precio as analysis_price
        FROM muestras s
        LEFT JOIN pacientes p ON s.PacienteId = p.Id
        LEFT JOIN tiposanalisis ta ON s.TipoAnalisisId = ta.Id
        ORDER BY s.FechaToma DESC
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

        // POST sample
        const [result] = await connection.execute(
          'INSERT INTO muestras (PacienteId, TipoAnalisisId, Estado) VALUES (?, ?, ?)',
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