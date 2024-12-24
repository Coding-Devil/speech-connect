import { useState, useEffect, useCallback } from 'react';
import { TranscriptionResult, SupportedLanguage } from '../types';

export const useSpeechRecognition = (language: SupportedLanguage) => {
  const [isListening, setIsListening] = useState(false);
  const [transcription, setTranscription] = useState<TranscriptionResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!('webkitSpeechRecognition' in window)) {
      setError('Speech recognition is not supported in this browser.');
      return;
    }

    const recognition = new (window as any).webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = language;

    recognition.onresult = (event: any) => {
      const result = event.results[event.results.length - 1];
      const transcriptionText = result[0].transcript;
      
      setTranscription({
        text: transcriptionText,
        language,
        timestamp: Date.now()
      });
    };

    recognition.onerror = (event: any) => {
      setError(event.error);
      setIsListening(false);
    };

    if (isListening) {
      recognition.start();
    }

    return () => {
      recognition.stop();
    };
  }, [isListening, language]);

  const toggleListening = useCallback(() => {
    setIsListening(!isListening);
  }, [isListening]);

  return {
    isListening,
    transcription,
    error,
    toggleListening
  };
};