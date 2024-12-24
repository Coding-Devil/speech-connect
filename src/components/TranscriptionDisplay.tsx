import React from 'react';
import { TranscriptionResult } from '../types';
import { TranscriptionCard } from './TranscriptionCard';

interface Props {
  transcription: TranscriptionResult | null;
  translation: {
    text: string | null;
    isLoading: boolean;
    error: string | null;
  };
  sourceLanguage: string;
  targetLanguage: string;
}

export const TranscriptionDisplay: React.FC<Props> = ({
  transcription,
  translation,
  sourceLanguage,
  targetLanguage
}) => {
  if (!transcription) return null;

  return (
    <div className="w-full max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
      <TranscriptionCard
        title="Original Text"
        text={transcription.text}
        language={sourceLanguage}
        variant="primary"
      />
      <TranscriptionCard
        title="Translation"
        text={translation.text || 'Waiting for translation...'}
        language={targetLanguage}
        variant="secondary"
        isLoading={translation.isLoading}
        error={translation.error}
      />
    </div>
  );
};