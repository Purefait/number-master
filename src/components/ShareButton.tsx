import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { encodeGameState } from '../utils/shareState';

interface ShareButtonProps {
  code: string;
  hints: {
    numbers: number[];
    correct: number;
    misplaced: number;
  }[];
  gameStatus: 'playing' | 'won' | 'lost';
  remainingAttempts: number;
  className?: string;
}

const ShareButton: React.FC<ShareButtonProps> = ({ 
  code, 
  hints, 
  gameStatus,
  remainingAttempts,
  className = ''
}) => {
  const [copied, setCopied] = useState(false);
  const { t, i18n } = useTranslation();

  const handleShare = async () => {
    try {
      // Encode l'état du jeu
      const gameState = {
        code: code.split('').map(Number),
        hints,
        gameStatus,
        remainingAttempts
      };
      
      const encodedState = encodeGameState(gameState);
      const baseUrl = window.location.origin;
      // Construire l'URL de partage sans le préfixe de langue
      const shareUrl = `${baseUrl}/share/${encodedState}`;

      console.log('URL de partage:', shareUrl);

      if (navigator.share) {
        try {
          await navigator.share({
            title: 'Crack the Code Challenge',
            text: t('shareMessage'),
            url: shareUrl,
          });
          console.log('Partagé avec succès');
        } catch (shareError) {
          console.error('Erreur lors du partage:', shareError);
          await copyToClipboard(shareUrl);
        }
      } else {
        await copyToClipboard(shareUrl);
      }
    } catch (err) {
      console.error('Erreur générale:', err);
    }
  };

  const copyToClipboard = async (text: string) => {
    try {
      // Essayer d'abord l'API Clipboard moderne
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        return;
      }

      // Méthode de secours avec execCommand
      const textarea = document.createElement('textarea');
      textarea.value = text;
      // Rendre l'élément invisible
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      textarea.style.left = '-9999px';
      
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();
      
      try {
        // Copier le texte
        const successful = document.execCommand('copy');
        if (!successful) throw new Error('Copy command failed');
        
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('execCommand error:', err);
        throw err;
      } finally {
        // Nettoyer
        document.body.removeChild(textarea);
      }
    } catch (err) {
      console.error('Erreur lors de la copie:', err);
      // Afficher l'URL à l'utilisateur s'il ne peut pas la copier
      alert(t('copyFallbackMessage') + '\n\n' + text);
    }
  };

  return (
    <button
      onClick={handleShare}
      className={`${className} relative transition-all duration-200 ${
        copied ? 'bg-green-500 hover:bg-green-600' : ''
      }`}
      type="button"
      disabled={copied}
    >
      <span className={`inline-flex items-center gap-2 ${
        copied ? 'opacity-0' : 'opacity-100'
      } transition-opacity duration-200`}>
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
        {t('share')}
      </span>
      <span className={`absolute inset-0 flex items-center justify-center ${
        copied ? 'opacity-100' : 'opacity-0'
      } transition-opacity duration-200`}>
        <svg
          className="w-5 h-5 mr-2"
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
        {t('copied')}
      </span>
    </button>
  );
};

export default ShareButton;
