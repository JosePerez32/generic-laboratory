// components/LoadingSpinner.jsx
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-64">
    <div className="relative">
      <div className="w-12 h-12 rounded-full border-4 border-primary-200 border-t-primary-600 animate-spin"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="w-6 h-6 rounded-full border-2 border-white"></div>
      </div>
    </div>
  </div>
);