import React from 'react';
import type { TranslationKey } from '../translations';

interface HintSectionProps {
  numbers: number[];
  correct: number;
  misplaced: number;
  highlightedNumber: number | null;
  onNumberClick: (num: number) => void;
  t: Record<TranslationKey, string>;
}

const HintSection: React.FC<HintSectionProps> = ({
  numbers,
  correct,
  misplaced,
  highlightedNumber,
  onNumberClick,
  t
}) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          {numbers.map((num, index) => (
            <button
              key={index}
              onClick={() => onNumberClick(num)}
              className={`w-8 h-8 flex items-center justify-center rounded transition-all transform
                ${
                  highlightedNumber === num
                    ? 'bg-game-yellow text-game-blue scale-110 font-bold ring-2 ring-white'
                    : 'bg-white/20 hover:bg-white/30'
                }
              `}
            >
              {num}
            </button>
          ))}
        </div>
        <div className="flex-1 flex justify-center">
          {correct === 0 && misplaced === 0 ? (
            <p className="text-red-400 text-center">{t.noCorrect}</p>
          ) : (
            <div className="space-y-1 text-center">
              {correct > 0 && (
                <p className="text-emerald-400">
                  {correct} {t.correctWellPlaced}{correct > 1 ? 's' : ''}
                </p>
              )}
              {misplaced > 0 && (
                <p className="text-yellow-400">
                  {misplaced} {t.correctMisplaced}{misplaced > 1 ? 's' : ''}
                </p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HintSection;