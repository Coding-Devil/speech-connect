import { useState, useEffect, useRef, useCallback } from 'react';
import { SupportedLanguage, TranslationResult } from '../types';
import { translateText } from '../utils/translation';

export const useTranslation = (
  text: string,
  sourceLang: SupportedLanguage,
  targetLang: SupportedLanguage
): TranslationResult => {
  const [result, setResult] = useState<TranslationResult>({
    text: null,
    isLoading: false,
    error: null
  });
  
  const timeoutRef = useRef<number>();
  const abortControllerRef = useRef<AbortController>();

  const performTranslation = useCallback(async () => {
    if (!text?.trim() || sourceLang === targetLang) {
      setResult({ text: text || null, isLoading: false, error: null });
      return;
    }

    setResult(prev => ({ ...prev, isLoading: true, error: null }));

    try {
      // Cancel any pending translation
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      
      abortControllerRef.current = new AbortController();
      
      const translatedText = await translateText(text, sourceLang, targetLang);
      setResult({ text: translatedText, isLoading: false, error: null });
    } catch (error) {
      // Ignore aborted requests
      if (error instanceof Error && error.name === 'AbortError') {
        return;
      }
      
      setResult({
        text: null,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Translation failed'
      });
    }
  }, [text, sourceLang, targetLang]);

  useEffect(() => {
    timeoutRef.current = window.setTimeout(performTranslation, 500);

    return () => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [performTranslation]);

  return result;
};