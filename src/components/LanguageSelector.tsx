import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DE, FR, GB, ES, IT } from 'country-flag-icons/react/3x2';
import type { Language } from '../translations';

interface LanguageSelectorProps {
  currentLanguage: Language;
}

interface LanguageOption {
  code: Language;
  name: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const languages: LanguageOption[] = [
  { code: 'en', name: 'English', icon: GB },
  { code: 'fr', name: 'Français', icon: FR },
  { code: 'de', name: 'Deutsch', icon: DE },
  { code: 'es', name: 'Español', icon: ES },
  { code: 'it', name: 'Italiano', icon: IT },
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ currentLanguage }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLang = languages.find(lang => lang.code === currentLanguage);
  const FlagIcon = currentLang?.icon || GB;

  const handleLanguageChange = (langCode: Language) => {
    setIsOpen(false);
    
    // Extraire le code partagé de l'URL actuelle
    const pathParts = location.pathname.split('/');
    const isSharedGame = pathParts.includes('share');
    const sharedCode = isSharedGame ? pathParts[pathParts.length - 1] : null;
    
    // Construire la nouvelle URL en préservant le code partagé
    let newPath;
    if (isSharedGame) {
      newPath = langCode === 'en' 
        ? `/share/${sharedCode}`
        : `/${langCode}/share/${sharedCode}`;
    } else {
      newPath = langCode === 'en' ? '/' : `/${langCode}`;
    }
    
    navigate(newPath);
  };

  return (
    <div className="fixed md:absolute top-4 right-4 z-[1000]">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 px-3 py-2 rounded-lg transition-colors shadow-lg"
        >
          <FlagIcon className="w-6 h-4" />
          <span className="text-sm">{currentLang?.name}</span>
          <svg
            className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-slate-800 rounded-lg shadow-lg overflow-hidden">
            {languages.map(({ code, name, icon: Icon }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className={`w-full flex items-center gap-2 px-4 py-3 text-left hover:bg-slate-700 transition-colors
                  ${code === currentLanguage ? 'bg-slate-700' : ''}`}
              >
                <Icon className="w-6 h-4" />
                <span className="text-sm">{name}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LanguageSelector;
