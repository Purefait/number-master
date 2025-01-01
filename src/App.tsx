import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateCode } from './utils/code';
import { generateHints } from './utils/hints';
import HintSection from './components/HintSection';
import Confetti from './components/Confetti';
import { useSoundEffects } from './utils/sounds';
import LanguageSelector from './components/LanguageSelector';
import ShareButton from './components/ShareButton';
import RulesPopup from './components/RulesPopup';
import { translations, type Language, type Translation } from './translations';
import { decodeGameState } from './utils/shareState';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
function App() {
  const { lang, code: sharedState } = useParams<{ lang?: string; code?: string }>();
  const navigate = useNavigate();
  const currentLang = (lang || 'en') as Language;
  const t = translations[currentLang];

  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [hints, setHints] = useState<any[]>([]);
  const [digits, setDigits] = useState<string[]>(['', '', '']);
  const [gameStatus, setGameStatus] = useState<'playing' | 'won' | 'lost'>('playing');
  const [remainingAttempts, setRemainingAttempts] = useState<number>(2);
  const [highlightedNumber, setHighlightedNumber] = useState<number | null>(null);
  const { playWin, playLose, playClick, playType } = useSoundEffects();

  useEffect(() => {
    if (sharedState) {
      const decodedState = decodeGameState(sharedState);
      if (decodedState) {
        setSecretCode(decodedState.code);
        setHints(decodedState.hints);
        setGameStatus('playing');
        setRemainingAttempts(2);
      } else {
        startNewGame();
      }
    } else {
      startNewGame();
    }
  }, [sharedState]);

  const startNewGame = () => {
    const newCode = generateCode();
    setSecretCode(newCode);
    setHints(generateHints(newCode));
    setDigits(['', '', '']);
    setGameStatus('playing');
    setRemainingAttempts(2);
    setHighlightedNumber(null);
    
    // Retirer le code de l'URL lors d'une nouvelle partie
    const basePath = currentLang === 'en' ? '/' : `/${currentLang}`;
    navigate(basePath);
    
    setTimeout(() => playClick(), 50);
  };

  const handleDigitChange = (index: number, value: string) => {
    if (!/^[0-9]$/.test(value) && value !== '') return;
    
    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);
    
    // Si on a entré un chiffre valide et qu'il y a un input suivant, on y va
    if (value !== '' && index < 2) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const input = e.currentTarget;

    switch (e.key) {
      case 'ArrowLeft':
        if (index > 0) {
          const prevInput = document.getElementById(`digit-${index - 1}`);
          prevInput?.focus();
        }
        break;
      case 'ArrowRight':
        if (index < 2) {
          const nextInput = document.getElementById(`digit-${index + 1}`);
          nextInput?.focus();
        }
        break;
      case 'Backspace':
        if (input.value === '' && index > 0) {
          const prevInput = document.getElementById(`digit-${index - 1}`);
          prevInput?.focus();
        }
        break;
      case 'Enter':
        if (digits.join('').length === 3) {
          handleSubmit(e);
        }
        break;
      default:
        if (/^[0-9]$/.test(e.key)) {
          playType();
        }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Vérifier que tous les chiffres sont entrés
    if (digits.join('').length !== 3 || gameStatus !== 'playing') return;

    const guess = digits.join('');
    
    if (guess === secretCode.join('')) {
      setGameStatus('won');
      setTimeout(() => playWin(), 50);
    } else {
      const newRemainingAttempts = remainingAttempts - 1;
      setRemainingAttempts(newRemainingAttempts);
      
      if (newRemainingAttempts === 0) {
        setGameStatus('lost');
        setTimeout(() => playLose(), 50);
      } else {
        setTimeout(() => playClick(), 50);
      }
    }
    
    setDigits(['', '', '']);
  };

  return (
    <div className="min-h-screen bg-game-blue text-white p-8">
      <LanguageSelector currentLanguage={currentLang} />
      
      <div className="max-w-lg mx-auto relative">
        <div className="absolute left-0 top-1">
          <RulesPopup rules={t.rules} title={t.rulesTitle} />
        </div>
        
        <h1 className="text-4xl font-bold text-center mb-8">{t.title}</h1>
        
        {gameStatus === 'won' && <Confetti />}
        
        <p className="text-slate-200 text-center mb-8">
          {t.rules.split('\n\n')[0]}
        </p>

        <div className="flex justify-center gap-2 mb-4">
          {[...Array(2)].map((_, i) => (
            <div
              key={i}
              className={`w-4 h-4 rounded-full ${
                i < remainingAttempts ? 'bg-game-yellow' : 'bg-slate-700'
              }`}
            />
          ))}
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl mb-8">
          <form onSubmit={handleSubmit} className="">
            <div className="flex justify-center gap-4 mb-4">
              {[0, 1, 2].map((index) => (
                <input
                  key={index}
                  id={`digit-${index}`}
                  type="text"
                  maxLength={1}
                  value={digits[index]}
                  onChange={(e) => handleDigitChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-16 h-16 bg-white/20 text-white text-center text-2xl rounded-lg tracking-widest placeholder-white/50"
                  disabled={gameStatus !== 'playing'}
                />
              ))}
            </div>
            {gameStatus === 'playing' && (
              <div className="flex justify-center gap-4">
                <button
                  type="submit"
                  disabled={digits.join('').length !== 3}
                  className="bg-game-yellow text-game-blue px-8 py-2 rounded-lg hover:bg-opacity-90 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed font-semibold"
                >
                  {t.submit}
                </button>
                <ShareButton
                  code={secretCode.join('')}
                  hints={hints}
                  gameStatus={gameStatus}
                  remainingAttempts={remainingAttempts}
                  className="bg-white/20 text-white px-8 py-2 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                />
              </div>
            )}
          </form>

          {gameStatus !== 'playing' && (
            <div className={`text-center space-y-4 mt-4 p-4 rounded-lg ${
              gameStatus === 'won' ? 'bg-green-500/20' : 'bg-red-500/20'
            }`}>
              <p className="text-2xl font-bold mb-4">
                {gameStatus === 'won' ? t.win : t.lose + ' ' + secretCode.join('')}
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={startNewGame}
                  className="bg-game-yellow text-game-blue px-8 py-2 rounded-lg hover:bg-opacity-90 font-semibold"
                >
                  {t.newGame}
                </button>
                <ShareButton 
                  code={secretCode.join('')} 
                  hints={hints}
                  gameStatus={gameStatus}
                  remainingAttempts={remainingAttempts}
                  className="bg-white/20 text-white px-8 py-2 rounded-lg hover:bg-white/30 disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                />
              </div>
            </div>
          )}
        </div>

        <div className="space-y-3">
          <h2 className="text-lg font-semibold text-game-yellow mb-2">{t.hints}</h2>
          {hints.map((hint, index) => (
            <HintSection
              key={index}
              numbers={hint.numbers}
              correct={hint.correct}
              misplaced={hint.misplaced}
              highlightedNumber={highlightedNumber}
              onNumberClick={(num) => {
                playClick();
                setHighlightedNumber(highlightedNumber === num ? null : num);
              }}
              t={t}
            />
          ))}
          <Analytics />
          <SpeedInsights />

        </div>
      </div>
    </div>
  );
}

export default App;