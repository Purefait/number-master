import React from 'react';
import { Delete, CornerDownLeft } from 'lucide-react';

interface KeypadProps {
  onNumberClick: (num: number) => void;
  onDelete: () => void;
  onSubmit: () => void;
  disabled?: boolean;
}

const Keypad: React.FC<KeypadProps> = ({
  onNumberClick,
  onDelete,
  onSubmit,
  disabled = false
}) => {
  return (
    <div className="grid grid-cols-3 gap-2">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
        <button
          key={num}
          onClick={() => onNumberClick(num)}
          disabled={disabled}
          className="aspect-square bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {num}
        </button>
      ))}
      <button
        onClick={onDelete}
        disabled={disabled}
        className="aspect-square bg-slate-700 hover:bg-slate-600 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Delete className="w-6 h-6" />
      </button>
      <button
        onClick={() => onNumberClick(0)}
        disabled={disabled}
        className="aspect-square bg-slate-700 hover:bg-slate-600 text-white font-bold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        0
      </button>
      <button
        onClick={onSubmit}
        disabled={disabled}
        className="aspect-square bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg flex items-center justify-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <CornerDownLeft className="w-6 h-6" />
      </button>
    </div>
  );
};

export default Keypad;