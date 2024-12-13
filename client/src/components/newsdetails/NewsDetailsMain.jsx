import { useState } from "react";
import parser from "html-react-parser";
import { Bookmark, BookmarkMinus, Loader2, FileText, Share2 } from "lucide-react";

import { toastWithTime } from "../ui/Toaster";
import useBookmark from "../../hooks/useBookmarks"
import useTranslation from "../../hooks/useTranslation";
import Modal from "../ui/Modal.jsx";

const NewsDetailsMain = ({ news }) => {
  const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
  const [isShareModalOpen, setShareModalOpen] = useState(false);

  const { isBookmarked, loading, handleBookmark } = useBookmark(news.id);
  const { isTranslating, translatedSummary, handleTranslate } = useTranslation(news.summary);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    toastWithTime("success", "URL copied to clipboard");
  };

  return (
    <div className="flex flex-col gap-y-5 bg-white rounded-t-md">
      <img src={news.image} alt={news.title} className="rounded-t-md" />
      <div className="flex flex-col gap-y-4 px-6 pb-6">
        <h3 className="text-red-700 uppercase font-medium text-xl">{news.category.nepaliName}</h3>
        <div className="flex justify-between items-center">
          <h2 className="text-3xl font-bold">{news.title}</h2>
          <div className="flex gap-4">
            <button
              onClick={handleBookmark}
              disabled={loading}
              aria-label="Bookmark"
            >
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : isBookmarked ? (
                <BookmarkMinus />
              ) : (
                <Bookmark />
              )}
            </button>

            {/* Summary Button */}
            <button onClick={() => setSummaryModalOpen(true)} aria-label="View Summary">
              <FileText />
            </button>

            {/* Share Button */}
            <button onClick={() => setShareModalOpen(true)} aria-label="Share">
              <Share2 />
            </button>
          </div>
        </div>

        <div>{parser(news.description)}</div>
      </div>

      {/* Summary Modal */}
      <Modal isOpen={isSummaryModalOpen} onClose={() => setSummaryModalOpen(false)}>
  <div className="px-6 py-4">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">समाचारको सारांश</h3>
    <p className="text-sm text-gray-700 mb-6">{news.summary}</p>

    <div className="flex justify-center">
      <button
        onClick={handleTranslate}
        disabled={isTranslating}
        className="px-6 py-2 text-sm font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition duration-300 ease-in-out transform disabled:opacity-50"
      >
        {isTranslating ? "Translating..." : "Translate to English"}
      </button>
    </div>

    {translatedSummary && (
      <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
        <h4 className="font-bold text-gray-800 mb-2">Translated Summary:</h4>
        <p className="text-gray-700">{translatedSummary}</p>
      </div>
    )}
  </div>
</Modal>


      {/* Share Modal */}
      <Modal isOpen={isShareModalOpen} onClose={() => setShareModalOpen(false)}>
  <div className="px-6 py-4">
    <h3 className="text-2xl font-semibold text-gray-800 mb-6">यो समाचार साझा गर्नुहोस्</h3>
    
    <div className="mb-3">
      <input
        type="text"
        value={window.location.href}
        readOnly
        className="w-full p-3 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    
    <div className="flex justify-start">
      <button
        onClick={handleCopyToClipboard}
        className="w-full sm:w-auto py-2 px-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition duration-300 ease-in-out transform hover:scale-105"
      >
        Copy URL
      </button>
    </div>

    <p className="text-sm text-gray-600 mt-4">
      यो लिङ्क तपाईंका साथीहरू वा सामाजिक मिडियामा साझा गर्न सक्नुहुन्छ।
    </p>
  </div>
</Modal>

    </div>
  );
};

export default NewsDetailsMain;