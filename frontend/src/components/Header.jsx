// components/Header.jsx
export const Header = () => (
  <header className="bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-lg">
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
            <svg className="w-6 h-6 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 7a1 1 0 000 2h8a1 1 0 100-2H3zm0 4a1 1 0 000 2h8a1 1 0 100-2H3zm0 4a1 1 0 100 2h8a1 1 0 100-2H3z" clipRule="evenodd" />
            </svg>
          </div>
          <div>
            <h1 className="text-2xl font-bold">MediTrack Pro</h1>
            <p className="text-primary-100 text-sm">Gestión de Pacientes y Muestras</p>
          </div>
        </div>
        <nav className="flex space-x-6">
          <a href="#pacientes" className="hover:text-primary-200 transition-colors font-medium">Pacientes</a>
          <a href="#muestras" className="hover:text-primary-200 transition-colors font-medium">Muestras</a>
          <a href="#estadisticas" className="hover:text-primary-200 transition-colors font-medium">Estadísticas</a>
        </nav>
      </div>
    </div>
  </header>
);