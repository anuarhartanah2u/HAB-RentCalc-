/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HelpCircle, ShieldCheck, Calculator, Landmark } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils';

interface FormulaReferenceProps {
  language: Language;
}

export default function FormulaReference({ language }: FormulaReferenceProps) {
  const t = TRANSLATIONS[language];
  const [isAudited, setIsAudited] = useState<boolean>(true);

  return (
    <div 
      id="formula-reference-panel"
      className="bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 shadow-xl transition-all duration-300 text-slate-700 animate-fadeIn"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-[#BDD7EE]/10 rounded-lg text-slate-600 border border-[#BDD7EE]/30">
            <Calculator id="icon-calc" size={20} />
          </div>
          <div>
            <h3 id="formula-title" className="font-display font-extrabold text-slate-805 text-base md:text-lg">
              {t.refFormulas}
            </h3>
            <p className="text-xs text-slate-400 mt-0.5 font-mono font-semibold">
              HAB RentCalc Standard Ver 5.0
            </p>
          </div>
        </div>
        
        {/* Verification Badge */}
        <div 
          id="audit-badge" 
          className="flex items-center gap-1.5 px-3 py-1 bg-[#C6EFDF]/20 border border-[#C6EFDF]/60 text-slate-700 text-xs font-bold rounded-lg shadow-2xs"
        >
          <ShieldCheck size={14} className="text-emerald-600" />
          <span>Formula Di-Sahkan (Audited)</span>
        </div>
      </div>

      <p id="formula-explanation" className="text-xs text-slate-500 leading-relaxed mb-5 border-l-2 border-[#C6EFDF] pl-3 font-medium">
        {t.refExplanation}
      </p>

      {/* Grid of Formulas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4" id="formulas-grid font-sans">
         
         {/* 1. Security Deposit Formula */}
        <div className="bg-slate-50 border border-slate-205/60 rounded-xl p-4 hover:border-[#BDD7EE]/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BDD7EE]"></span>
            <span className="text-xs font-bold text-slate-705 font-display">1. {t.f_security}</span>
          </div>
          <div className="bg-white rounded-lg p-2.5 mb-1.5 text-center border border-slate-200 font-semibold shadow-2xs">
            <code className="text-xs font-mono font-bold text-slate-700 break-all">
              Security Deposit = Rent × Deposit Months (Standard: 2.0)
            </code>
          </div>
          <span className="text-[10px] text-slate-400 font-mono italic block text-right">
            {t.detailSecFormula}
          </span>
        </div>

        {/* 2. Utility Deposit Formula */}
        <div className="bg-slate-50 border border-slate-205/60 rounded-xl p-4 hover:border-[#F7C2A9]/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F7C2A9]"></span>
            <span className="text-xs font-bold text-slate-705 font-display">2. {t.f_utility}</span>
          </div>
          <div className="bg-white rounded-lg p-2.5 mb-1.5 text-center border border-slate-200 font-semibold shadow-2xs">
            <code className="text-xs font-mono font-bold text-slate-700 break-all">
              Utility Deposit = Rent × Utility Factor (Standard: 0.5)
            </code>
          </div>
          <span className="text-[10px] text-slate-400 font-mono italic block text-right">
            {t.detailUtilFormula}
          </span>
        </div>

        {/* 3. Stamping & Agreement Formula */}
        <div className="bg-slate-50 border border-slate-205/60 rounded-xl p-4 hover:border-[#FCDAD7]/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FCDAD7]"></span>
            <span className="text-xs font-bold text-slate-705 font-display">3. {t.f_stamping}</span>
          </div>
          <div className="bg-white rounded-lg p-2.5 mb-1.5 text-center border border-slate-200 font-semibold shadow-2xs">
            <code className="text-xs font-mono font-bold text-slate-700 break-all">
              Documents & Stamping = Rent × Document Rate (Standard: 30%)
            </code>
          </div>
          <span className="text-[10px] text-slate-400 font-mono italic block text-right">
            {t.detailStampingFormula}
          </span>
        </div>

        {/* 4. Gross Tenant Payment */}
        <div className="bg-slate-50 border border-slate-205/60 rounded-xl p-4 hover:border-[#C6EFDF]/60 transition-colors">
          <div className="flex items-center gap-2 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6EFDF]"></span>
            <span className="text-xs font-bold text-slate-705 font-display">4. {language === 'BM' ? 'Jumlah Kasar Pembayaran Tenant' : 'Gross Tenant Payment'}</span>
          </div>
          <div className="bg-white rounded-lg p-2.5 mb-1.5 text-center border border-slate-200 font-semibold shadow-2xs">
            <code className="text-[10px] md:text-xs font-mono font-bold text-slate-700 break-all leading-normal">
              Total = Advance Rent + Security Deposit + Utility + Access Card + Others + Documentation & Stamping
            </code>
          </div>
        </div>

        {/* 5. Net Owner Balance Formula */}
        <div className="bg-slate-50 border border-slate-205/60 rounded-xl p-4 md:col-span-2 hover:border-[#D6CDE6]/60 transition-colors animate-fadeIn">
          <div className="flex items-center gap-2 mb-2">
            <Landmark size={15} className="text-[#D6CDE6]" />
            <span className="text-xs font-bold text-slate-705 font-display">5. {t.f_owner_balance}</span>
          </div>
          <div className="bg-white border border-slate-200 rounded-lg p-3 mb-2 text-center font-semibold shadow-2xs">
            <code className="text-xs md:text-sm font-mono font-bold text-slate-700 break-all">
              Owner Balance = Total Deposits Held - (Agency Booking Fee + 8% SST Commission)
            </code>
          </div>
          <span className="text-[10px] text-slate-400 font-mono italic block text-right mb-1.5">
            {t.detailOwnerFormula}
          </span>
        </div>

      </div>

      <div className="bg-[#C6EFDF]/15 border border-[#C6EFDF]/40 rounded-xl p-4 mt-4 animate-fadeIn" id="cash-flow-explanation">
        <h4 className="text-xs font-bold text-slate-800 font-display mb-1 flex items-center gap-1.5 uppercase tracking-wider font-extrabold">
          <HelpCircle size={14} className="text-slate-550" />
          {t.detailsExplain}
        </h4>
        <p className="text-xs text-slate-600 leading-relaxed font-semibold">
          {t.detailsExplanationText}
        </p>
      </div>

      {/* Manual verification checkbox */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center gap-3" id="verify-action-grp">
        <input
          type="checkbox"
          id="chk-formulas-verified"
          checked={isAudited}
          onChange={(e) => setIsAudited(e.target.checked)}
          className="w-4 h-4 text-slate-800 bg-white border-slate-300 rounded-sm focus:ring-[#C6EFDF] focus:ring-opacity-50 transition-all cursor-pointer"
        />
        <label htmlFor="chk-formulas-verified" className="text-xs font-bold text-slate-500 cursor-pointer select-none">
          {t.verifiedCheckbox} <span className="text-[10px] font-normal text-slate-400 block sm:inline">({t.verifiedNote})</span>
        </label>
      </div>
    </div>
  );
}
