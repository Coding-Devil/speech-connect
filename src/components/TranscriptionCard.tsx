import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  title: string;
  text: string;
  language: string;
  variant: 'primary' | 'secondary';
  isLoading?: boolean;
  error?: string | null;
}

export const TranscriptionCard: React.FC<Props> = ({
  title,
  text,
  language,
  variant,
  isLoading = false,
  error = null
}) => {
  const bgColor = variant === 'primary' 
    ? 'bg-white/80 border-purple-100' 
    : 'bg-gradient-to-br from-purple-50 to-pink-50 border-pink-100';
  
  return (
    <div className={`${bgColor} rounded-xl p-6 shadow-lg h-[300px] overflow-y-auto relative
                    backdrop-blur-sm border transition-all duration-300 hover:shadow-xl`}>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        <span className="text-sm px-3 py-1 rounded-full bg-white/50 text-purple-700 font-medium uppercase">
          {language}
        </span>
      </div>
      
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 backdrop-blur-sm">
          <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
        </div>
      )}
      
      {error ? (
        <div className="text-red-500 bg-red-50 p-4 rounded-lg">{error}</div>
      ) : (
        <p className="text-xl leading-relaxed whitespace-pre-wrap text-gray-700">{text}</p>
      )}
    </div>
  );
};