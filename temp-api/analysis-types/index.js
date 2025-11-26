import { getConnection } from '../utils/db.js';

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }
  try {
    const connection = await getConnection();
    if (req.method === 'GET') {
      const [analysisTypes] = await connection.execute(
        'SELECT Id as id, Nombre as name, Descripcion as description, Precio as price, TiempoResultadoHoras as result_hours FROM tiposanalisis ORDER BY Nombre'
      );
      res.status(200).json({ success: true, data: analysisTypes });
    } else {
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ success: false, error: `Method ${req.method} Not Allowed` });
    }
  } catch (error) {
    console.error('Aiven API Error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Database error',
      message: error.message 
    });
  } finally {
    await connection.end();
  }
}