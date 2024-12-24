import React from 'react';
import { Volume2 } from 'lucide-react';

interface Props {
  isVisible: boolean;
}

export const SpeakNotification: React.FC<Props> = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="absolute -top-16 left-1/2 -translate-x-1/2 bg-purple-600 text-white px-4 py-2 rounded-full 
                    shadow-lg flex items-center gap-2 animate-fade-in">
      <Volume2 className="w-4 h-4 animate-pulse" />
      <span className="font-medium">Speak now</span>
    </div>
  );
};