/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';

interface LanguageSelectorProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageSelector({ currentLanguage, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex justify-center items-center gap-2 mb-2" id="lang-selector-container">
      <button
        type="button"
        id="btn-lang-bm"
        onClick={() => onLanguageChange('BM')}
        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 border cursor-pointer ${
          currentLanguage === 'BM'
            ? 'bg-emerald-650 text-white border-emerald-650 font-bold shadow-xs'
            : 'bg-transparent text-slate-550 border-transparent hover:text-slate-770 hover:bg-slate-100'
        }`}
      >
        Bahasa Malaysia
      </button>
      <span className="text-slate-300 text-xs font-light">|</span>
      <button
        type="button"
        id="btn-lang-en"
        onClick={() => onLanguageChange('EN')}
        className={`px-4 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 border cursor-pointer ${
          currentLanguage === 'EN'
            ? 'bg-emerald-650 text-white border-emerald-650 font-bold shadow-xs'
            : 'bg-transparent text-slate-555 border-transparent hover:text-slate-770 hover:bg-slate-100'
        }`}
      >
        English
      </button>
    </div>
  );
}
