#!/bin/bash
# setup-aiven.sh

echo "🚀 Configurando Nelson Labs con Aiven MySQL..."

# Crear estructura de carpetas
mkdir -p api/utils frontend/src/{components,hooks,services}

# Instalar dependencias
echo "📦 Instalando dependencias..."
npm install axios
npm init -y
npm install mysql2 vercel

# Frontend
cd frontend
npm create vite@latest . -- --template react
npm install axios lucide-react
cd ..

echo "✅ Estructura creada!"
echo "📝 No olvides configurar las variables de entorno en Vercel:"
echo "   AIVEN_HOST, AIVEN_USER, AIVEN_PASSWORD, AIVEN_DB_NAME, AIVEN_CA_CERT"