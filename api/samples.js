// api/samples/index.js
//import { getConnection } from './utils/db.js';
import pool from './utils/db.js';
export default async function handler(req, res) {
  //res.status(200).json({ ok: true, message: 'Funcionando...' });
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  try {
    //const connection = await getConnection();
    if (req.method === 'GET') {
      // const [samples] = await connection.execute(`
      //const [samples] = await pool.execute(`
      const [samples] = await pool.query(`
        SELECT 
          s.Id as id,
          s.PacienteId as patient_id,
          s.TipoAnalisisId as analysis_type_id,
          s.FechaToma as collection_date,
          s.Estado as status,
          s.Resultado as result,
          p.Nombre as patient_name,
          ta.Nombre as analysis_name
        FROM muestras s
        LEFT JOIN pacientes p ON s.PacienteId = p.Id
        LEFT JOIN tiposanalisis ta ON s.TipoAnalisisId = ta.Id
        ORDER BY s.FechaToma DESC
      `);
      // res.status(200).json({ success: true, data: samples });
       return res.status(200).json(samples);
    }
    // else {
    //   res.status(405).json({ success: false, error: 'Method not allowed' });
    // }
    if (req.method === 'POST') {
      const { patient_id, analysis_type_id, status = 'pending' } = req.body;
      
      const [result] = await pool.execute(
        'INSERT INTO muestras (PacienteId, TipoAnalisisId, Estado, FechaToma) VALUES (?, ?, ?, NOW())',
        [patient_id, analysis_type_id, status]
      );
      
      return res.status(201).json({ 
        id: result.insertId,
        patient_id,
        analysis_type_id,
        status
      });
    }
    return res.status(405).json({ error: 'Method not allowed' });

  } catch (error) {
    console.error('Error in samples endpoint:', error);
    // res.status(500).json({ success: false, error: error.message });
    return res.status(500).json({ error: error.message });
  } //finally {
  //   await connection.end();
  // }
}