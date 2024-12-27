import React from 'react';

interface GuessRowProps {
  guess: number[];
  result?: {
    correct: number;
    misplaced: number;
  };
  isEmpty?: boolean;
}

const GuessRow: React.FC<GuessRowProps> = ({ guess, result, isEmpty = false }) => {
  const emptySlots = 4 - guess.length;
  
  return (
    <div className="flex items-center gap-4">
      <div className="flex-1 grid grid-cols-4 gap-2">
        {guess.map((num, index) => (
          <div
            key={index}
            className="w-full aspect-square bg-slate-700 rounded-lg flex items-center justify-center text-xl font-bold"
          >
            {num}
          </div>
        ))}
        {Array.from({ length: emptySlots }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className="w-full aspect-square bg-slate-700/50 rounded-lg"
          />
        ))}
      </div>
      
      {!isEmpty && result && (
        <div className="flex gap-1">
          {Array.from({ length: result.correct }).map((_, index) => (
            <div key={`correct-${index}`} className="w-3 h-3 rounded-full bg-emerald-500" />
          ))}
          {Array.from({ length: result.misplaced }).map((_, index) => (
            <div key={`misplaced-${index}`} className="w-3 h-3 rounded-full bg-yellow-500" />
          ))}
          {Array.from({ length: 4 - result.correct - result.misplaced }).map((_, index) => (
            <div key={`wrong-${index}`} className="w-3 h-3 rounded-full bg-slate-600" />
          ))}
        </div>
      )}
    </div>
  );
};

export default GuessRow;