import { SupportedLanguage } from '../types';
import axios from 'axios';
import { TRANSLATION_CONFIG } from './constants';

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const translateWithRetry = async (
  text: string,
  sourceLang: SupportedLanguage,
  targetLang: SupportedLanguage,
  retries = TRANSLATION_CONFIG.MAX_RETRIES
): Promise<string> => {
  try {
    const response = await axios({
      method: 'POST',
      url: TRANSLATION_CONFIG.API_URL,
      params: {
        key: import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY
      },
      data: {
        q: text,
        source: sourceLang,
        target: targetLang,
        format: 'text'
      }
    });

    return response.data?.data?.translations?.[0]?.translatedText || text;
  } catch (error) {
    if (retries === 0) {
      throw error;
    }

    if (axios.isAxiosError(error)) {
      // Don't retry on authentication errors
      if (error.response?.status === 403) {
        throw new Error('Translation API key invalid or quota exceeded');
      }
      
      // Retry on network errors or 5xx server errors
      if (!error.response || error.response.status >= 500) {
        await delay(TRANSLATION_CONFIG.RETRY_DELAY);
        return translateWithRetry(text, sourceLang, targetLang, retries - 1);
      }
    }
    
    throw error;
  }
};

export const translateText = async (
  text: string,
  sourceLang: SupportedLanguage,
  targetLang: SupportedLanguage
): Promise<string> => {
  if (!text?.trim() || sourceLang === targetLang) {
    return text;
  }

  try {
    return await translateWithRetry(text, sourceLang, targetLang);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Translation failed: ${error.response?.data?.error?.message || 'Unknown error'}`);
    }
    throw new Error('Translation service unavailable');
  }
};