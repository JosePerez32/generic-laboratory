// api/welcome.js
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  const welcomeHTML = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>MediTrack API</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; padding: 20px; }
          .endpoint { background: #f5f5f5; padding: 10px; margin: 5px 0; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>🚀 MediTrack API - Funcionando</h1>
        <p>Endpoints disponibles:</p>
        <div class="endpoint"><strong>GET</strong> /api/patients</div>
        <div class="endpoint"><strong>POST</strong> /api/patients</div>
        <div class="endpoint"><strong>GET</strong> /api/samples</div>
        <p>📚 Visita <a href="/">el frontend</a> para usar la aplicación.</p>
      </body>
    </html>
  `;

  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(welcomeHTML);
}