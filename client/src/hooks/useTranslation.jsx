import { useState } from "react";
import { toastWithTime } from "../components/ui/Toaster";
import { api } from "../config";

const useTranslation = (summary) => {
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedSummary, setTranslatedSummary] = useState("");

  const handleTranslate = async () => {
    setIsTranslating(true);

    try {
      const response = await api.get(`/translate`, { text: summary });
      setTranslatedSummary(response.data.translatedText);
    } catch (error) {
      toastWithTime("error", "Error translating the summary.");
    } finally {
      setIsTranslating(false);
    }
  };

  return { isTranslating, translatedSummary, handleTranslate };
};

export default useTranslation;
