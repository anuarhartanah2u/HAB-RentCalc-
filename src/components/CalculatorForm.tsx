/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';
import { 
  Building, 
  DollarSign, 
  Percent, 
  User, 
  CreditCard, 
  Coins, 
  Plus, 
  BookOpen, 
  Compass, 
  CheckCircle2,
  Database,
  ArrowRightLeft
} from 'lucide-react';
import { CalculatorInputs, Language, BookingOption, SecurityDepositOption, UtilityDepositOption, StampingOption } from '../types';
import { TRANSLATIONS } from '../utils';

interface CalculatorFormProps {
  language: Language;
  inputs: CalculatorInputs;
  onInputChange: (updates: Partial<CalculatorInputs>) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function CalculatorForm({ language, inputs, onInputChange, onSubmit }: CalculatorFormProps) {
  const t = TRANSLATIONS[language];
  const [profileSaving, setProfileSaving] = useState<boolean>(false);

  // Auto-Save animation trigger when agent or agency details change
  useEffect(() => {
    setProfileSaving(true);
    const timer = setTimeout(() => {
      setProfileSaving(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [inputs.agentName, inputs.agentBank, inputs.agencyName, inputs.agencyBank]);

  const handleTextChange = (key: keyof CalculatorInputs, val: string | number) => {
    onInputChange({ [key]: val });
  };

  return (
    <form onSubmit={onSubmit} id="calculator-input-form" className="space-y-5">
      
      {/* 1. Nama Properti */}
      <div id="form-group-prop-name" className="space-y-1.5">
        <label htmlFor="input-prop-name" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
          <Building size={14} className="text-[#BDD7EE]" />
          {t.propName}
        </label>
        <div className="relative">
          <input
            type="text"
            id="input-prop-name"
            value={inputs.propertyName}
            onChange={(e) => handleTextChange('propertyName', e.target.value)}
            placeholder={t.propPlaceholder}
            className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#BDD7EE] focus:border-[#BDD7EE] focus:bg-white text-slate-800 placeholder:text-slate-400 text-sm font-semibold rounded-xl pl-10 pr-4 py-3 outline-hidden transition-all duration-200 shadow-xs"
          />
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
            <Compass size={16} />
          </span>
        </div>
      </div>

      {/* Grid of basic parameters */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="rent-and-booking-row">
        
        {/* 2. Sewa Bulanan (RM) */}
        <div id="form-group-rent" className="space-y-1.5 col-span-2 sm:col-span-1">
          <label htmlFor="input-rent" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <DollarSign size={14} className="text-[#C6EFDF]" />
            {t.monthlyRent}
          </label>
          <div className="relative">
            <input
              type="number"
              id="input-rent"
              value={inputs.monthlyRent}
              onChange={(e) => handleTextChange('monthlyRent', Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#C6EFDF] focus:border-[#C6EFDF] focus:bg-white text-sm font-mono font-bold text-slate-800 rounded-xl pl-10 pr-4 py-3 outline-hidden transition-all duration-200 shadow-xs"
              placeholder="e.g. 2000"
              required
              min="0"
              step="100"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs font-mono font-bold text-slate-400">
              RM
            </span>
          </div>
        </div>

        {/* 3. Pilihan Booking Agency */}
        <div id="form-group-booking" className="space-y-1.5 col-span-2 sm:col-span-1">
          <label htmlFor="input-booking" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <Percent size={14} className="text-[#FCDAD7]" />
            {t.bookingAgency}
          </label>
          <select
            id="input-booking"
            value={inputs.bookingOption}
            onChange={(e) => handleTextChange('bookingOption', e.target.value as BookingOption)}
            className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#FCDAD7] focus:border-[#FCDAD7] focus:bg-white text-xs font-bold text-slate-700 rounded-xl px-3 py-3 outline-hidden cursor-pointer transition-all duration-200 shadow-xs"
          >
            <option value="1.25_SST" id="opt-booking-1.25-sst">{t.booking_1_25_SST}</option>
            <option value="1.00_SST" id="opt-booking-1.00-sst">{t.booking_1_00_SST}</option>
            <option value="1.25_NO_SST" id="opt-booking-1.25-nosst">{t.booking_1_25_NO_SST}</option>
            <option value="1.00_NO_SST" id="opt-booking-1.00-nosst">{t.booking_1_00_NO_SST}</option>
            <option value="CUSTOM" id="opt-booking-custom">{t.booking_custom}</option>
          </select>
        </div>

      </div>

      {/* Conditionally reveal Custom Booking Amount */}
      {inputs.bookingOption === 'CUSTOM' && (
        <div id="custom-booking-panel" className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-1.5 animate-fadeIn">
          <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">
            Custom Booking Agency Amount (RM)
          </label>
          <div className="relative">
            <input
              type="number"
              value={inputs.customBookingAmount}
              onChange={(e) => handleTextChange('customBookingAmount', Number(e.target.value))}
              className="w-full bg-white border border-slate-200 focus:border-[#FCDAD7] text-xs font-mono font-semibold text-slate-800 rounded-lg pl-10 pr-3 py-2 outline-hidden"
              placeholder="e.g. 2500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-400">RM</span>
          </div>
        </div>
      )}

      {/* Grid of deposit options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="deposits-options-row">
        
        {/* 4. Security Deposit Option */}
        <div id="form-group-security" className="space-y-1.5">
          <label htmlFor="input-security-dep" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <Coins size={14} className="text-[#F7C2A9]" />
            Security Deposit (Bulan)
          </label>
          <select
            id="input-security-dep"
            value={inputs.securityDepositOption}
            onChange={(e) => handleTextChange('securityDepositOption', e.target.value as SecurityDepositOption)}
            className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#F7C2A9] focus:border-[#F7C2A9] focus:bg-white text-xs font-bold text-slate-700 rounded-xl px-3 py-3 outline-hidden cursor-pointer transition-all duration-200 shadow-xs"
          >
            <option value="2.0" id="opt-sec-2.0">{t.sec_2_0}</option>
            <option value="1.0" id="opt-sec-1.0">{t.sec_1_0}</option>
            <option value="1.5" id="opt-sec-1.5">{t.sec_1_5}</option>
            <option value="0.0" id="opt-sec-0.0">{t.sec_0_0}</option>
            <option value="CUSTOM" id="opt-sec-custom">{t.sec_custom}</option>
          </select>
        </div>

        {/* 5. Utility Deposit Option */}
        <div id="form-group-utility" className="space-y-1.5">
          <label htmlFor="input-utility-dep" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <Coins size={14} className="text-[#D6CDE6]" />
            {t.utilityDeposit}
          </label>
          <select
            id="input-utility-dep"
            value={inputs.utilityDepositOption}
            onChange={(e) => handleTextChange('utilityDepositOption', e.target.value as UtilityDepositOption)}
            className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#D6CDE6] focus:border-[#D6CDE6] focus:bg-white text-xs font-bold text-slate-700 rounded-xl px-3 py-3 outline-hidden cursor-pointer transition-all duration-200 shadow-xs"
          >
            <option value="0.5" id="opt-util-0.5">{t.util_0_5}</option>
            <option value="1.0" id="opt-util-1.0">{t.util_1_0}</option>
            <option value="0.0" id="opt-util-0.0">{t.util_0_0}</option>
            <option value="CUSTOM" id="opt-util-custom">{t.util_custom}</option>
          </select>
        </div>

      </div>

      {/* Conditionally reveal Custom Security Deposit */}
      {inputs.securityDepositOption === 'CUSTOM' && (
        <div id="custom-sec-panel" className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-1.5 animate-fadeIn">
          <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Custom Security Deposit (RM)</label>
          <div className="relative">
            <input
              type="number"
              value={inputs.customSecurityDepositAmount}
              onChange={(e) => handleTextChange('customSecurityDepositAmount', Number(e.target.value))}
              className="w-full bg-white border border-slate-200 focus:border-[#F7C2A9] text-xs font-mono font-semibold text-slate-800 rounded-lg pl-10 pr-3 py-2 outline-hidden"
              placeholder="e.g. 4000"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-400">RM</span>
          </div>
        </div>
      )}

      {/* Conditionally reveal Custom Utility Deposit */}
      {inputs.utilityDepositOption === 'CUSTOM' && (
        <div id="custom-util-panel" className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-1.5 animate-fadeIn">
          <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Custom Utility Deposit (RM)</label>
          <div className="relative">
            <input
              type="number"
              value={inputs.customUtilityDepositAmount}
              onChange={(e) => handleTextChange('customUtilityDepositAmount', Number(e.target.value))}
              className="w-full bg-white border border-slate-200 focus:border-[#D6CDE6] text-xs font-mono font-semibold text-slate-800 rounded-lg pl-10 pr-3 py-2 outline-hidden"
              placeholder="e.g. 1000"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-400">RM</span>
          </div>
        </div>
      )}

      {/* 6. Documents & Stamping pilihan */}
      <div id="form-group-stamping" className="space-y-1.5">
        <label htmlFor="input-stamping-opt" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
          <BookOpen size={14} className="text-[#BDD7EE]" />
          {t.documentsStamping}
        </label>
        <select
          id="input-stamping-opt"
          value={inputs.stampingOption}
          onChange={(e) => handleTextChange('stampingOption', e.target.value as StampingOption)}
          className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#BDD7EE] focus:border-[#BDD7EE] focus:bg-white text-xs font-bold text-slate-700 rounded-xl px-3 py-3 outline-hidden cursor-pointer transition-all duration-200 shadow-xs"
        >
          <option value="30_PERCENT" id="opt-stamp-30">{t.stamp_30}</option>
          <option value="25_PERCENT" id="opt-stamp-25">{t.stamp_25}</option>
          <option value="0.0" id="opt-stamp-0">{t.stamp_0_0}</option>
          <option value="CUSTOM" id="opt-stamp-custom">{t.stamp_custom}</option>
        </select>
      </div>

      {/* Conditionally reveal Custom Stamping */}
      {inputs.stampingOption === 'CUSTOM' && (
        <div id="custom-stamp-panel" className="bg-slate-50 border border-slate-150 rounded-xl p-3 space-y-1.5 animate-fadeIn">
          <label className="text-xs font-bold text-slate-500 block uppercase tracking-wider">Custom Stamping & Agreement Costs (RM)</label>
          <div className="relative">
            <input
              type="number"
              value={inputs.customStampingAmount}
              onChange={(e) => handleTextChange('customStampingAmount', Number(e.target.value))}
              className="w-full bg-white border border-slate-200 focus:border-[#BDD7EE] text-xs font-mono font-semibold text-slate-800 rounded-lg pl-10 pr-3 py-2 outline-hidden"
              placeholder="e.g. 500"
            />
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-400">RM</span>
          </div>
        </div>
      )}

      {/* Grid of flat deposits: Access Card & Others */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4" id="cards-others-row">
        
        {/* 7. Access Card Deposit */}
        <div id="form-group-access" className="space-y-1.5">
          <label htmlFor="input-access" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <Plus size={14} className="text-[#C6EFDF]" />
            {t.accessCard}
          </label>
          <div className="relative">
            <input
              type="number"
              id="input-access"
              value={inputs.accessCardDeposit}
              onChange={(e) => handleTextChange('accessCardDeposit', Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#C6EFDF] focus:border-[#C6EFDF] focus:bg-white text-sm font-mono font-bold text-slate-800 rounded-xl pl-10 pr-4 py-3 outline-hidden transition-all duration-200 shadow-xs"
              placeholder="0"
              min="0"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-400">RM</span>
          </div>
        </div>

        {/* 8. Others Deposit */}
        <div id="form-group-others" className="space-y-1.5">
          <label htmlFor="input-others-dep" className="text-xs font-bold text-slate-500 flex items-center gap-1.5 uppercase tracking-wider">
            <Plus size={14} className="text-[#FCDAD7]" />
            {t.othersDeposit}
          </label>
          <div className="relative">
            <input
              type="number"
              id="input-others-dep"
              value={inputs.othersDeposit}
              onChange={(e) => handleTextChange('othersDeposit', Math.max(0, Number(e.target.value)))}
              className="w-full bg-slate-50 hover:bg-slate-100/80 border border-slate-200 hover:border-[#FCDAD7] focus:border-[#FCDAD7] focus:bg-white text-sm font-mono font-bold text-slate-800 rounded-xl pl-10 pr-4 py-3 outline-hidden transition-all duration-200 shadow-xs"
              placeholder="0"
              min="0"
            />
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[10px] font-mono font-semibold text-slate-400">RM</span>
          </div>
        </div>

      </div>

      {/* 9. Agency & Agent Profile information (Auto-Save Card) */}
      <div 
        id="profile-auto-save-card"
        className="bg-[#D6CDE6]/10 border border-[#D6CDE6]/40 rounded-2xl p-4 md:p-5 space-y-4 shadow-xs animate-fadeIn"
      >
        <div className="flex justify-between items-center pb-2 border-b border-dashed border-[#D6CDE6]/35">
          <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5 tracking-wider uppercase">
            <User size={13} className="text-[#D6CDE6]" />
            {language === 'BM' ? 'Maklumat Profil (Auto-Save)' : 'Profile Details (Auto-Save)'}
          </span>
          <div className="flex items-center gap-1">
            <span className="relative flex h-2 w-2">
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${profileSaving ? 'bg-amber-400' : 'bg-emerald-500'}`}></span>
              <span className={`relative inline-flex rounded-full h-2 w-2 ${profileSaving ? 'bg-amber-500' : 'bg-emerald-500'}`}></span>
            </span>
            <span className="text-[9px] font-bold text-slate-500 font-mono">
              {profileSaving ? 'SAVING...' : 'SAVED'}
            </span>
          </div>
        </div>

        {/* Agency section fields */}
        <div className="space-y-3 pb-3 border-b border-dashed border-slate-200">
          <span className="text-[10px] uppercase font-bold text-[#F7C2A9] tracking-wider block">
            {t.agencySection}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="agency-form-name" className="space-y-1">
              <label htmlFor="agency-name-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.agencyName}
              </label>
              <input
                type="text"
                id="agency-name-input"
                value={inputs.agencyName || ''}
                onChange={(e) => handleTextChange('agencyName', e.target.value)}
                placeholder="Oriental Real Estate Sdn Bhd"
                className="w-full bg-white border border-slate-200 hover:border-[#BDD7EE] focus:border-[#BDD7EE] text-xs font-semibold text-slate-800 rounded-lg px-3 py-2 outline-hidden transition-all shadow-2xs"
              />
            </div>

            <div id="agency-form-bank" className="space-y-1">
              <label htmlFor="agency-bank-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.agencyBank}
              </label>
              <input
                type="text"
                id="agency-bank-input"
                value={inputs.agencyBank || ''}
                onChange={(e) => handleTextChange('agencyBank', e.target.value)}
                placeholder="CIMB: 8009 7113 65"
                className="w-full bg-white border border-slate-200 hover:border-[#BDD7EE] focus:border-[#BDD7EE] text-xs font-semibold text-slate-800 rounded-lg px-3 py-2 outline-hidden transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>

        {/* Agent section fields */}
        <div className="space-y-3 pt-1">
          <span className="text-[10px] uppercase font-bold text-[#F7C2A9] tracking-wider block">
            {t.agentSection}
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div id="agent-form-name" className="space-y-1">
              <label htmlFor="agent-name-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.agentName}
              </label>
              <input
                type="text"
                id="agent-name-input"
                value={inputs.agentName}
                onChange={(e) => handleTextChange('agentName', e.target.value)}
                placeholder="Hj Anuar Bin Ibrahim"
                className="w-full bg-white border border-slate-200 hover:border-[#BDD7EE] focus:border-[#BDD7EE] text-xs font-semibold text-slate-800 rounded-lg px-3 py-2 outline-hidden transition-all shadow-2xs"
              />
            </div>

            <div id="agent-form-bank" className="space-y-1">
              <label htmlFor="agent-bank-input" className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                {t.agentBank}
              </label>
              <input
                type="text"
                id="agent-bank-input"
                value={inputs.agentBank}
                onChange={(e) => handleTextChange('agentBank', e.target.value)}
                placeholder="Maybank 164342223916"
                className="w-full bg-white border border-slate-200 hover:border-[#BDD7EE] focus:border-[#BDD7EE] text-xs font-semibold text-slate-800 rounded-lg px-3 py-2 outline-hidden transition-all shadow-2xs"
              />
            </div>
          </div>
        </div>

      </div>

      {/* 10. Generate Button */}
      <button
        type="submit"
        id="btn-generate-calculations"
        className="w-full py-4 bg-slate-800 hover:bg-slate-700 active:scale-98 text-white font-display font-bold text-sm md:text-base rounded-xl cursor-pointer shadow-lg hover:shadow-slate-300/10 transition-all duration-200 flex justify-center items-center gap-2"
      >
        <ArrowRightLeft size={18} />
        {t.generateBtn}
      </button>

    </form>
  );
}
