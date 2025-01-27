import { useState } from 'react';
import { toastWithTime } from '../components/ui/Toaster';
import { translateApi } from '../config';

const useTranslation = (summary) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedSummary, setTranslatedSummary] = useState('');

  const handleTranslate = async () => {
    setIsTranslating(true);

    try {
      const response = await translateApi.post(`/translate`, { text: summary });
      setTranslatedSummary(response.data.data.translated_text);
    } catch (error) {
      toastWithTime('error', 'Error translating the summary.');
    } finally {
      setIsTranslating(false);
    }
  };

  return { isTranslating, translatedSummary, handleTranslate };
};

export default useTranslation;
