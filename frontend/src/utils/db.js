// api/utils/db.js
import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: process.env.AIVEN_HOST,
    port: process.env.AIVEN_PORT || 26358, // Puerto típico Aiven
    user: process.env.AIVEN_USER,
    password: process.env.AIVEN_PASSWORD,
    database: process.env.AIVEN_DB_NAME,
    ssl: {
      rejectUnauthorized: true,
      ca: process.env.AIVEN_CA_CERT // El certificado SSL de Aiven
    }
  });
}