import React from 'react';
import { AlertTriangle } from 'lucide-react';

export const EmergencyButton: React.FC = () => {
  const handleEmergency = () => {
    alert('Emergency services would be contacted in a production environment');
  };

  return (
    <button
      onClick={handleEmergency}
      className="fixed bottom-4 right-4 bg-gradient-to-r from-red-500 to-pink-500 
                text-white p-4 rounded-full shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:scale-105
                animate-pulse-slow"
      aria-label="Emergency button"
    >
      <AlertTriangle className="w-6 h-6" />
    </button>
  );
};