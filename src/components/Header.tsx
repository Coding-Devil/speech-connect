import React from 'react';
import { Mic, Globe2, Heart } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-purple-100">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
            <Mic className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Jeevadhara Speech Connect
            </h1>
            <p className="text-sm text-gray-600 flex items-center gap-2">
              <Globe2 className="w-4 h-4" />
              Bridging hearts through words
              <Heart className="w-4 h-4 text-pink-500" />
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};