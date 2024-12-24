export interface TranslationConfig {
  sourceLanguage: string;
  targetLanguage: string;
  apiKey: string;
}

export interface TranscriptionResult {
  text: string;
  language: string;
  timestamp: number;
}

export type SupportedLanguage = 'en' | 'hi' | 'kn' | 'ta' | 'te';

export interface LanguageOption {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
}

export interface TranslationResult {
  text: string | null;
  isLoading: boolean;
  error: string | null;
}