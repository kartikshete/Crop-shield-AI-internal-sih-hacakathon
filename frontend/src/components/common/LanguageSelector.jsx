import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Globe } from 'lucide-react';

export const LanguageSelector = ({ className = '' }) => {
  const { lang, setLang } = useLanguage();

  const languages = [
    { code: 'en', label: 'English', native: 'English' },
    { code: 'mr', label: 'Marathi', native: 'मराठी' },
    { code: 'hi', label: 'Hindi', native: 'हिंदी' },
  ];

  return (
    <div className={`relative inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm border border-slate-200 rounded-xl px-2.5 py-1.5 shadow-sm ${className}`}>
      <Globe className="w-4 h-4 text-agri-600 flex-shrink-0" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        className="bg-transparent text-xs font-semibold text-slate-700 cursor-pointer focus:outline-none appearance-none pr-4"
        aria-label="Select Language"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.native} ({l.label})
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] text-slate-400">
        ▼
      </div>
    </div>
  );
};

export default LanguageSelector;
