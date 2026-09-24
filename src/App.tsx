/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { 
  Calculator, 
  HelpCircle, 
  Sparkles, 
  BookOpen, 
  Info,
  Globe,
  Settings,
  ChevronDown,
  Cloud
} from 'lucide-react';
import { CalculatorInputs, Language } from './types';
import { TRANSLATIONS, solveCalculation } from './utils';

// Import our modular sub-components
import LanguageSelector from './components/LanguageSelector';
import FormulaReference from './components/FormulaReference';
import CalculatorForm from './components/CalculatorForm';
import CalculationResults from './components/CalculationResults';
import GoogleDriveManager from './components/GoogleDriveManager';

const STORAGE_KEY_INPUTS = 'al_aqarat_calc_inputs_v4';
const STORAGE_KEY_LANG = 'al_aqarat_calc_lang_v4';

const DEFAULT_INPUTS: CalculatorInputs = {
  propertyName: '',
  monthlyRent: 2000, // pre-fill like in the screenshot
  bookingOption: '1.25_SST', // default like in the screenshot
  customBookingAmount: 2500,
  securityDepositOption: '2.0', // Standard 2 months
  customSecurityDepositAmount: 4000,
  utilityDepositOption: '0.5', // 0.5 months standard
  customUtilityDepositAmount: 1000,
  stampingOption: '30_PERCENT', // default like booking
  customStampingAmount: 600,
  accessCardDeposit: 0,
  othersDeposit: 0,
  agencyName: 'Oriental Real Estate Sdn Bhd',
  agencyBank: 'CIMB: 8009 7113 65',
  agentName: 'Hj Anuar Bin Ibrahim', // Auto-filled from user's details
  agentBank: 'Maybank 164342223916' // Auto-filled from user's details
};

export default function App() {
  // 1. Language Toggle State (Default BM, but saves user choice)
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_LANG);
    return (saved === 'EN' || saved === 'BM') ? (saved as Language) : 'BM';
  });

  // 2. Calculator Inputs State
  const [inputs, setInputs] = useState<CalculatorInputs>(() => {
    const saved = localStorage.getItem(STORAGE_KEY_INPUTS);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure standard keys exist to support upgrades
        return { ...DEFAULT_INPUTS, ...parsed };
      } catch (e) {
        return DEFAULT_INPUTS;
      }
    }
    return DEFAULT_INPUTS;
  });

  // 3. Status flag if they have calculated at least once (to show summary card)
  const [hasCalculated, setHasCalculated] = useState<boolean>(true); // default true so outputs are instantly visual
  const [isDriveOpen, setIsDriveOpen] = useState<boolean>(false);

  const resultRef = useRef<HTMLDivElement | null>(null);

  // Sync inputs to local storage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_INPUTS, JSON.stringify(inputs));
  }, [inputs]);

  // Sync language selection to local storage on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY_LANG, language);
  }, [language]);

  const handleInputChange = (updates: Partial<CalculatorInputs>) => {
    setInputs(prev => ({ ...prev, ...updates }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasCalculated(true);
    
    // Smooth scroll down to results section
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const currentTranslation = TRANSLATIONS[language];
  const breakdown = solveCalculation(inputs);

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#BDD7EE]/40 via-[#FCDAD7]/20 to-[#D6CDE6]/40 text-slate-800 py-8 px-4 md:py-16 sm:px-6 lg:px-8 font-sans antialiased" id="main-app-container">
      
      {/* Maximum width container to keep presentation tight and elegant */}
      <div className="max-w-xl mx-auto space-y-6" id="app-wrapper">
        
        {/* MAIN COMPACT CALCULATOR CARD (Elegant Pastel-Aligned Light Theme) */}
        <div id="calculator-card-container" className="bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-slate-200/60">
          
          {/* Elegant Pastel-Aligned Card Header */}
          <div id="card-header-light" className="bg-gradient-to-b from-[#9075D8]/25 to-white text-slate-800 px-5 py-6 md:px-8 text-center space-y-3 relative border-b border-slate-100">
            
            {/* Top segmented language choices and Google Drive integration */}
            <div className="flex items-center justify-between gap-2 max-w-sm mx-auto">
              <LanguageSelector 
                currentLanguage={language} 
                onLanguageChange={setLanguage} 
              />
              <button
                type="button"
                onClick={() => setIsDriveOpen(true)}
                id="btn-open-google-drive-top"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/95 hover:bg-white text-emerald-800 hover:text-emerald-950 border border-emerald-300/80 rounded-full text-xs font-bold shadow-2xs hover:shadow-xs transition-all cursor-pointer"
                title={language === 'BM' ? 'Urus & Simpan di Google Drive' : 'Manage & Save in Google Drive'}
              >
                <Cloud size={14} className="text-emerald-600" />
                <span>Google Drive</span>
              </button>
            </div>

            {/* Header Titles */}
            <div className="space-y-1">
              <h1 id="app-main-title" className="font-display font-extrabold text-xl md:text-2xl tracking-tight text-slate-850 uppercase">
                {currentTranslation.title}
              </h1>
              <p id="app-main-subtitle" className="text-xs text-indigo-700 font-bold tracking-widest uppercase">
                {currentTranslation.subtitle}
              </p>
              <p id="app-main-subdesc" className="text-xs text-slate-600 font-semibold tracking-wide pt-0.5">
                {currentTranslation.subdesc}
              </p>
            </div>

            {/* Accent tag in standard Elegant Pastel */}
            <div className="absolute right-3.5 bottom-3.5 opacity-10 text-slate-400">
              <Calculator size={38} />
            </div>

          </div>

          {/* Form Content Area */}
          <div className="p-5 md:p-8 bg-white" id="card-body-container">
            <CalculatorForm
              language={language}
              inputs={inputs}
              onInputChange={handleInputChange}
              onSubmit={handleFormSubmit}
            />
          </div>

        </div>

        {/* 2. DEDICATED REFERENCE FORMULA CARD */}
        <FormulaReference language={language} />

        {/* 3. CALCULATION BREAKDOWN RESULTS CARD */}
        {hasCalculated && (
          <CalculationResults
            language={language}
            inputs={inputs}
            breakdown={breakdown}
            resultRef={resultRef}
            onOpenDrive={() => setIsDriveOpen(true)}
          />
        )}

        {/* GOOGLE DRIVE INTEGRATION MODAL */}
        <GoogleDriveManager
          language={language}
          inputs={inputs}
          breakdown={breakdown}
          isOpen={isDriveOpen}
          onClose={() => setIsDriveOpen(false)}
          onRestoreInputs={(restored) => setInputs(restored)}
        />

        {/* FOOTER */}
        <footer id="developer-citation-footer" className="text-center text-[10px] text-slate-400 font-medium space-y-1 pb-8 pt-4">
          <p>{currentTranslation.footerText}</p>
          <p className="font-mono text-[9px] text-slate-500 font-semibold">HAB RentCalc Ver 5.0 • A PROP AGENT TOOL</p>
        </footer>

      </div>
    </div>
  );
}
