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

function App() {
  const { lang, code: sharedState } = useParams<{ lang?: string; code?: string }>();
  const navigate = useNavigate();
  const currentLang = (lang || 'en') as Language;
  const t = translations[currentLang];

  const [secretCode, setSecretCode] = useState<number[]>([]);
  const [hints, setHints] = useState<any[]>([]);
  const [currentGuess, setCurrentGuess] = useState<string>('');
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
    setCurrentGuess('');
    setGameStatus('playing');
    setRemainingAttempts(2);
    setHighlightedNumber(null);
    
    // Retirer le code de l'URL lors d'une nouvelle partie
    const basePath = currentLang === 'en' ? '/' : `/${currentLang}`;
    navigate(basePath);
    
    setTimeout(() => playClick(), 50);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (/^[0-9]$/.test(e.key) && currentGuess.length < 3) {
      playType();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentGuess.length !== 3 || gameStatus !== 'playing') return;

    const guess = currentGuess.split('').map(Number);
    
    if (guess.join('') === secretCode.join('')) {
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
    
    setCurrentGuess('');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    if (value.length <= 3) {
      setCurrentGuess(value);
    }
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              value={currentGuess}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={t.placeholder}
              className="w-full bg-white/20 text-white px-4 py-2 rounded-lg text-center text-2xl tracking-widest placeholder-white/50"
              disabled={gameStatus !== 'playing'}
            />
            
            {gameStatus === 'playing' && (
              <button
                type="submit"
                disabled={currentGuess.length !== 3}
                className="w-full bg-game-yellow text-game-blue hover:bg-opacity-90 disabled:bg-slate-700 disabled:text-slate-400 disabled:cursor-not-allowed py-2 px-4 rounded-lg transition-colors font-semibold"
              >
                {t.submit}
              </button>
            )}
          </form>

          {gameStatus !== 'playing' && (
            <div className={`mt-4 p-4 rounded-lg text-center ${
              gameStatus === 'won' ? 'bg-game-yellow/20' : 'bg-red-500/20'
            }`}>
              <p className="text-xl font-bold mb-4">
                {gameStatus === 'won' ? t.win : `${t.lose} ${secretCode.join('')}`}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={startNewGame}
                  className="bg-game-yellow text-game-blue hover:bg-opacity-90 py-2 px-4 rounded-lg transition-colors font-semibold"
                >
                  {t.newGame}
                </button>
                <ShareButton 
                  code={secretCode} 
                  hints={hints}
                  currentLanguage={currentLang} 
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
        </div>
      </div>
    </div>
  );
}

export default App;