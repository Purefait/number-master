import React, { useState } from 'react';
import { encodeGameState } from '../utils/shareState';

interface ShareButtonProps {
  code: number[];
  hints: {
    numbers: number[];
    correct: number;
    misplaced: number;
  }[];
  currentLanguage: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ code, hints, currentLanguage }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const gameState = {
      code,
      hints
    };
    
    const encodedState = encodeGameState(gameState);
    const baseUrl = window.location.origin;
    const langPath = currentLanguage === 'en' ? '' : `/${currentLanguage}`;
    const shareUrl = `${baseUrl}${langPath}/share/${encodedState}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Crack the Code Challenge',
          text: 'Can you crack this code? Try to solve this puzzle!',
          url: shareUrl,
        });
      } else {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      try {
        await navigator.clipboard.writeText(shareUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (clipboardErr) {
        console.error('Failed to copy:', clipboardErr);
        const tempInput = document.createElement('input');
        document.body.appendChild(tempInput);
        tempInput.value = shareUrl;
        tempInput.select();
        document.execCommand('copy');
        document.body.removeChild(tempInput);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    }
  };

  return (
    <button
      onClick={handleShare}
      className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-lg transition-colors"
      title="Share this game"
    >
      {!copied ? (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          <span>Share</span>
        </>
      ) : (
        <>
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
          <span>Copied!</span>
        </>
      )}
    </button>
  );
};

export default ShareButton;
