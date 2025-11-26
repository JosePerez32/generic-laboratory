// components/Alert.jsx
export const Alert = ({ type, message, onClose }) => {
  const styles = {
    success: 'bg-green-50 border-green-200 text-green-800',
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={`fixed top-4 right-4 border rounded-lg p-4 shadow-lg max-w-sm transform transition-all duration-300 ${styles[type]}`}>
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {type === 'success' && <CheckCircleIcon className="w-5 h-5" />}
          {type === 'error' && <XCircleIcon className="w-5 h-5" />}
          {type === 'warning' && <ExclamationIcon className="w-5 h-5" />}
          {type === 'info' && <InformationCircleIcon className="w-5 h-5" />}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button onClick={onClose} className="ml-4 flex-shrink-0">
          <XIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};