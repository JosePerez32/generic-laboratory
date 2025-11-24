import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: 'lavoratory-zjoseperezr-87fd.k.aivencloud.com',
    port: 26358,
    user: 'avnadmin',
    password: 'AVNS_37xMxoqUBaT76MkGZ-L',
    database: 'defaultdb',
    ssl: {
      rejectUnauthorized: true
    }
  });
}