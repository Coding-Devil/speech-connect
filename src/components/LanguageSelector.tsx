import React from 'react';
import { supportedLanguages } from '../config/languages';
import { SupportedLanguage } from '../types';
import { Globe } from 'lucide-react';

interface Props {
  value: SupportedLanguage;
  onChange: (language: SupportedLanguage) => void;
  label: string;
}

export const LanguageSelector: React.FC<Props> = ({ value, onChange, label }) => {
  return (
    <div className="flex flex-col space-y-2">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        <Globe className="w-4 h-4 text-purple-500" />
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as SupportedLanguage)}
        className="block w-full rounded-lg border-gray-300 bg-white/50 backdrop-blur-sm shadow-sm 
                 focus:border-purple-500 focus:ring focus:ring-purple-200 
                 transition-colors duration-200"
      >
        {supportedLanguages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name} ({lang.nativeName})
          </option>
        ))}
      </select>
    </div>
  );
};