import React, { useState, useRef, useEffect } from 'react';
import { FaQuestionCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';

interface RulesPopupProps {
  rules: string;
  title: string;
}

const RulesPopup: React.FC<RulesPopupProps> = ({ rules, title }) => {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        buttonRef.current &&
        !popupRef.current.contains(event.target as Node) &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatRules = (text: string) => {
    return text.split('\n').map((line, index) => {
      // Remplacer les mots de couleur par des spans stylés
      const formattedLine = line
        .replace(/vert/g, '<span class="font-bold text-green-500">vert</span>')
        .replace(/orange/g, '<span class="font-bold text-orange-500">orange</span>')
        .replace(/rouge/g, '<span class="font-bold text-red-500">rouge</span>');
      
      return (
        <p 
          key={index} 
          className={index === 0 ? 'mb-4' : 'mb-2'}
          dangerouslySetInnerHTML={{ __html: formattedLine }}
        />
      );
    });
  };

  return (
    <div className="relative z-50">
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="text-game-yellow hover:text-white transition-colors p-2"
        aria-label="Rules"
      >
        <FaQuestionCircle className="w-7 h-7" />
      </button>

      {isOpen && (
        <div
          ref={popupRef}
          className="absolute z-50 top-full left-0 w-72 bg-white text-game-blue rounded-lg shadow-xl p-4 mt-2"
          onMouseLeave={() => setIsOpen(false)}
        >
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold text-lg">{title}</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
              aria-label="Close rules"
            >
              <IoMdClose className="w-5 h-5" />
            </button>
          </div>
          <div className="text-game-blue space-y-2">
            {formatRules(rules)}
          </div>
        </div>
      )}
    </div>
  );
};

export default RulesPopup;
