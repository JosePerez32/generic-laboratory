import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: process.env.DB_HOST || 'lavoratory-zjoseperezr-87fd.k.aivencloud.com',
    port: process.env.DB_PORT || 26358,
    user: process.env.DB_USER || 'avnadmin',
    password: process.env.DB_PASSWORD || 'AVNS_37xMxoqUBaT76MkGZ-L',
        database: process.env.DB_NAME || 'defaultdb',
    ssl: {
      rejectUnauthorized: false,
      ca: process.env.AIVEN_CA_CERT  // ← Solo referencia
    }
  });
}