import React from 'react';
import { Mic, MicOff } from 'lucide-react';
import { SpeakNotification } from './SpeakNotification';

interface Props {
  isListening: boolean;
  onClick: () => void;
  disabled?: boolean;
}

export const MicButton: React.FC<Props> = ({ isListening, onClick, disabled }) => {
  return (
    <div className="relative">
      <SpeakNotification isVisible={isListening} />
      <button
        onClick={onClick}
        disabled={disabled}
        className={`p-6 rounded-full transition-all duration-300 transform hover:scale-105
          ${isListening 
            ? 'bg-gradient-to-r from-red-500 to-pink-500 animate-pulse-slow' 
            : 'bg-gradient-to-r from-purple-500 to-indigo-500'
          } 
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-lg'}
          shadow-md`}
        aria-label={isListening ? 'Stop listening' : 'Start listening'}
      >
        {isListening ? (
          <MicOff className="w-8 h-8 text-white" />
        ) : (
          <Mic className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  );
};