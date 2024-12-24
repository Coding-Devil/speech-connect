import React, { useState } from 'react';
import { MicButton } from './components/MicButton';
import { TranscriptionDisplay } from './components/TranscriptionDisplay';
import { LanguageSelector } from './components/LanguageSelector';
import { EmergencyButton } from './components/EmergencyButton';
import { Header } from './components/Header';
import { useSpeechRecognition } from './hooks/useSpeechRecognition';
import { useTranslation } from './hooks/useTranslation';
import { SupportedLanguage } from './types';

function App() {
  const [sourceLanguage, setSourceLanguage] = useState<SupportedLanguage>('en');
  const [targetLanguage, setTargetLanguage] = useState<SupportedLanguage>('hi');

  const {
    isListening,
    transcription,
    error,
    toggleListening
  } = useSpeechRecognition(sourceLanguage);

  const translation = useTranslation(
    transcription?.text || '',
    sourceLanguage,
    targetLanguage
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <div className="glass-card rounded-2xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <LanguageSelector
              value={sourceLanguage}
              onChange={setSourceLanguage}
              label="Speech Language"
            />
            <LanguageSelector
              value={targetLanguage}
              onChange={setTargetLanguage}
              label="Translation Language"
            />
          </div>

          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-lg mb-6">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div className="flex flex-col items-center space-y-8">
            <MicButton
              isListening={isListening}
              onClick={toggleListening}
              disabled={!!error}
            />

            <TranscriptionDisplay
              transcription={transcription}
              translation={translation}
              sourceLanguage={sourceLanguage}
              targetLanguage={targetLanguage}
            />
          </div>
        </div>
      </main>

      <EmergencyButton />
    </div>
  );
}

export default App;