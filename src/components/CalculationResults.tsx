/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Printer, 
  Coins, 
  Landmark, 
  Info,
  CreditCard,
  Cloud,
  UploadCloud
} from 'lucide-react';
import { CalculatorInputs, CalculationBreakdown, Language } from '../types';
import { TRANSLATIONS, formatCurrency, generateWhatsAppMessage } from '../utils';

interface CalculationResultsProps {
  language: Language;
  inputs: CalculatorInputs;
  breakdown: CalculationBreakdown;
  resultRef: React.RefObject<HTMLDivElement | null>;
  onOpenDrive?: () => void;
}

export default function CalculationResults({ language, inputs, breakdown, resultRef, onOpenDrive }: CalculationResultsProps) {
  const t = TRANSLATIONS[language];
  const [copied, setCopied] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'tenant' | 'landlord' | 'booking' | 'stamping'>('booking');

  const handleCopy = async () => {
    const text = generateWhatsAppMessage(inputs, breakdown, language);
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const stampStr = formatCurrency(breakdown.stampingFee);

  return (
    <div 
      ref={resultRef}
      id="calculation-results-card" 
      className="bg-white border border-slate-200/80 rounded-3xl p-5 md:p-6 shadow-xl space-y-6 scroll-mt-6 text-slate-700 animate-fadeIn"
    >
      
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pb-4 border-b border-slate-100">
        <div>
          <h3 id="headline-summary" className="font-display font-black text-slate-800 text-base md:text-lg">
            {t.resultsTitle}
          </h3>
          {inputs.propertyName && (
            <p className="text-xs text-slate-500 font-bold mt-0.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6EFDF] animate-pulse"></span>
              {t.receiptFor}: <strong className="text-slate-800 font-extrabold">{inputs.propertyName}</strong>
            </p>
          )}
        </div>

        <div className="flex items-center gap-2">
          {onOpenDrive && (
            <button
              type="button"
              onClick={onOpenDrive}
              id="btn-open-drive-header"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-50 text-emerald-800 hover:bg-emerald-100 hover:text-emerald-900 border border-emerald-200 rounded-lg text-xs font-bold cursor-pointer select-none transition-all duration-200 shadow-xs"
            >
              <Cloud size={13} className="text-emerald-600" />
              <span>Google Drive</span>
            </button>
          )}

          {/* Print Slip Button */}
          <button
            type="button"
            onClick={handlePrint}
            id="btn-print-slip"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-50 text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg text-xs font-bold cursor-pointer select-none transition-all duration-200 shadow-xs"
          >
            <Printer size={13} />
            <span>Sebut Harga Slip</span>
          </button>
        </div>
      </div>

      {/* Tabs navigation in high-quality Segmented layout using exact pastel color combinations */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 border-b border-slate-100 pb-3" id="results-tabs-wrapper">
        <button
          type="button"
          onClick={() => setActiveTab('booking')}
          id="tab-booking"
          className={`py-3 px-2 text-[10px] md:text-xs font-bold rounded-xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'booking'
              ? 'bg-[#BDD7EE] text-slate-800 font-black shadow-xs border border-[#BDD7EE]'
              : 'bg-slate-50 hover:bg-slate-100/75 text-slate-500 border border-slate-100'
          }`}
        >
          <span className="text-sm">🎟️</span>
          <span>BOOKING {language === 'BM' ? 'DEPOSIT' : 'RESERVATION'}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('stamping')}
          id="tab-stamping"
          className={`py-3 px-2 text-[10px] md:text-xs font-bold rounded-xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'stamping'
              ? 'bg-[#FCDAD7] text-slate-800 font-black shadow-xs border border-[#FCDAD7]'
              : 'bg-slate-50 hover:bg-slate-100/75 text-slate-500 border border-slate-100'
          }`}
        >
          <span className="text-sm">✍️</span>
          <span>{language === 'BM' ? 'DOKUMEN & SETEM' : 'DOCUMENTS & STAMPING'}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('tenant')}
          id="tab-tenant"
          className={`py-3 px-2 text-[10px] md:text-xs font-bold rounded-xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'tenant'
              ? 'bg-[#C6EFDF] text-slate-800 font-black shadow-xs border border-[#C6EFDF]'
              : 'bg-slate-50 hover:bg-slate-100/75 text-slate-500 border border-slate-100'
          }`}
        >
          <span className="text-sm">👤</span>
          <span>TENANT {language === 'BM' ? 'BAYARAN' : 'PAYMENTS'}</span>
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('landlord')}
          id="tab-landlord"
          className={`py-3 px-2 text-[10px] md:text-xs font-bold rounded-xl text-center cursor-pointer transition-all duration-200 flex flex-col items-center justify-center gap-1.5 ${
            activeTab === 'landlord'
              ? 'bg-[#D6CDE6] text-slate-800 font-black shadow-xs border border-[#D6CDE6]'
              : 'bg-slate-50 hover:bg-slate-100/75 text-slate-500 border border-slate-100'
          }`}
        >
          <span className="text-sm">💼</span>
          <span>OWNER {language === 'BM' ? 'BAKI NETT' : 'NET OUTFLOW'}</span>
        </button>  
      </div>

      {/* CONDITIONAL CONTENT PER TAB */}
      <div id="tab-content-area" className="space-y-4 font-sans">
        {activeTab === 'booking' && (
          <div id="content-booking" className="space-y-5 animate-fadeIn">
            
            {/* Top Info Banner */}
            <div className="p-3 bg-[#BDD7EE]/10 border border-[#BDD7EE]/30 text-slate-700 rounded-xl flex items-start gap-2">
              <Info size={15} className="mt-0.5 shrink-0 text-slate-500" />
              <p className="text-[10px] leading-relaxed font-semibold text-slate-600">
                {language === 'BM' 
                  ? 'Maklumat deposit hangus awal (Earnest Deposit) yang telah dijelaskan oleh tenant untuk memulakan proses sewaan hartanah.'
                  : 'Breakdown of the initial Earnest Booking Deposit paid by the tenant to initiate the rental agreement.'}
              </p>
            </div>

            {/* A. Dynamic booking fee highlight */}
            <div className="bg-[#BDD7EE]/20 border-2 border-[#BDD7EE]/80 rounded-2xl p-6 text-center shadow-xs space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 text-slate-400">
                <Coins size={44} />
              </div>
              <span className="text-xs font-black text-slate-600 uppercase tracking-widest block font-display">
                {language === 'BM' ? 'JUMLAH WANG TEMPAHAN (BOOKING)' : 'TOTAL EARNEST BOOKING DEPOSIT'}
              </span>
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 font-mono block">
                {formatCurrency(breakdown.bookingFeePaid)}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block">
                {language === 'BM' 
                  ? 'Jumlah ini ditandatangani sebagai Pendahuluan Komisyen Agensi' 
                  : 'This sum is held as the designated Agency Professional Commission'}
              </span>
            </div>

            {/* B. Where the booking payment goes ("kemana pembayaran") */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
                <Landmark size={15} className="text-[#BDD7EE]" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-display">
                  {language === 'BM' ? 'Saluran Pembayaran Rasmi Agensi' : 'Official Agency Payment Account'}
                </span>
              </div>
              
              <div id="agency-payee-channel" className="bg-white border-l-4 border-[#BDD7EE] rounded-r-xl p-4 border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 font-bold block text-[9px] uppercase tracking-wider">
                  Sila Pastikan Bayaran Ke Bank Agensi / Pay Direct To Agency Bank:
                </span>
                <span className="font-extrabold text-slate-800 text-sm block">
                  {inputs.agencyName || 'Oriental Real Estate Sdn Bhd'}
                </span>
                <span className="font-mono text-sm text-slate-700 font-extrabold block">
                  {inputs.agencyBank || 'CIMB: 8009 7113 65'}
                </span>
              </div>

              <p className="text-[10px] text-slate-500 leading-relaxed font-semibold">
                ⚠️ {language === 'BM'
                  ? 'Nota Keselamatan: Segala bayaran bagi wang booking (mewakili sebulan sewa) hendaklah dititipkan terus ke akaun amanah agensi untuk diselaraskan secara sah.'
                  : 'Security Note: All initial earnest reservation deposits must be directly and securely transited to the official agency bank account to safeguard client transactions.'}
              </p>
            </div>

          </div>
        )}

        {/* TAB 2: AGREEMENT & STAMPING DETAILS (Injected precisely between booking and tenant) */}
        {activeTab === 'stamping' && (
          <div id="content-stamping" className="space-y-5 animate-fadeIn">
            
            {/* Top Info Banner */}
            <div className="p-3 bg-[#FCDAD7]/15 border border-[#FCDAD7]/30 text-slate-700 rounded-xl flex items-start gap-2">
              <Info size={15} className="mt-0.5 shrink-0 text-slate-500" />
              <p className="text-[10px] leading-relaxed font-semibold text-slate-600">
                {language === 'BM' 
                  ? 'Kos penyusunan Perjanjian Sewa (Tenancy Agreement) and pembayaran Setem Hasil (Stamping Duty) kepada LHDN yang dikendalikan oleh Ejen.'
                  : 'Total service cost for the drafting of the Tenancy Agreement and the official Stamping process handled entirely by the agent.'}
              </p>
            </div>

            {/* A. Dynamic Stamping fee highlight */}
            <div className="bg-[#FCDAD7]/20 border-2 border-[#FCDAD7]/80 rounded-2xl p-6 text-center shadow-xs space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 text-slate-400">
                <Printer size={44} />
              </div>
              <span className="text-xs font-black text-slate-600 uppercase tracking-widest block font-display">
                {language === 'BM' ? 'JUMLAH YURAN DOKUMEN & STAMPING' : 'TOTAL DOCUMENTS & STAMPING FEE'}
              </span>
              <span className="text-4xl font-extrabold tracking-tight text-slate-900 font-mono block">
                {stampStr}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block">
                {language === 'BM' 
                  ? 'Dibayar terus kepada Ejen untuk keperluan perjanjian sewaan' 
                  : 'Remitted directly to the Agent to process documentation'}
              </span>
            </div>

            {/* B. Where the payment goes */}
            <div className="bg-slate-50/50 border border-slate-200 rounded-2xl p-5 space-y-4">
              <div className="flex items-center gap-2 pb-2.5 border-b border-slate-200">
                <Landmark size={15} className="text-[#FCDAD7]" />
                <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block font-display">
                  {language === 'BM' ? 'Akaun Penerima Ejen' : 'Agent Trustee Bank Details'}
                </span>
              </div>
              
              <div id="agent-payee-channel-stamping" className="bg-white border-l-4 border-[#FCDAD7] rounded-r-xl p-4 border border-slate-200 shadow-xs space-y-1">
                <span className="text-slate-400 font-bold block text-[9px] uppercase tracking-wider">
                  Sila Pastikan Bayaran Ke Akaun Ejen / Pay Direct To Representative Agent:
                </span>
                <span className="font-extrabold text-slate-800 text-sm block">
                  {inputs.agentName || 'Hj Anuar Bin Ibrahim'}
                </span>
                <span className="font-mono text-sm text-slate-700 font-extrabold block">
                  {inputs.agentBank || 'Maybank 164342223916'}
                </span>
              </div>
            </div>

          </div>
        )}

        {/* TAB 3: TENANT SEBUT HARGA */}
        {activeTab === 'tenant' && (
          <div id="content-tenant" className="space-y-4 animate-fadeIn">
            
            {/* Breakdown lines */}
            <div className="space-y-1">
              <div className="flex justify-between items-center text-xs text-slate-500 py-2 border-b border-dashed border-slate-100">
                <span className="font-semibold">{language === 'BM' ? 'Sewa Advance (Bulan Pertama)' : 'Advance Rent (1st Month)'}</span>
                <span className="font-mono font-bold text-slate-800">{formatCurrency(breakdown.advanceRental)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 py-2 border-b border-dashed border-slate-100">
                <span className="font-semibold">Security Deposit</span>
                <span className="font-mono font-bold text-slate-800">{formatCurrency(breakdown.securityDeposit)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 py-2 border-b border-dashed border-slate-100">
                <span className="font-semibold">Utility Deposit</span>
                <span className="font-mono font-bold text-slate-800">{formatCurrency(breakdown.utilityDeposit)}</span>
              </div>
              <div className="flex justify-between items-center text-xs text-slate-500 py-2 border-b border-dashed border-slate-100">
                <span className="font-semibold">{language === 'BM' ? 'Kos Documents & Stamping' : 'Documents & Stamping Fee'}</span>
                <span className="font-mono font-bold text-slate-800">{stampStr}</span>
              </div>
              {breakdown.accessCardDeposit > 0 && (
                <div className="flex justify-between items-center text-xs text-slate-500 py-2 border-b border-dashed border-slate-100">
                  <span className="font-semibold">Deposit Kad Akses</span>
                  <span className="font-mono font-bold text-slate-800">{formatCurrency(breakdown.accessCardDeposit)}</span>
                </div>
              )}
              {breakdown.othersDeposit > 0 && (
                <div className="flex justify-between items-center text-xs text-slate-500 py-2 border-b border-dashed border-slate-100">
                  <span className="font-semibold">Deposit Lain-lain</span>
                  <span className="font-mono font-bold text-slate-800">{formatCurrency(breakdown.othersDeposit)}</span>
                </div>
              )}
            </div>

            {/* Highly visible highlight panel for Total Gross Due in Mint Green */}
            <div className="bg-[#C6EFDF]/20 border-2 border-[#C6EFDF]/85 rounded-2xl p-6 text-center shadow-xs space-y-2 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-3 opacity-10 text-slate-450">
                <CreditCard size={44} />
              </div>
              <span className="text-xs font-black text-slate-650 uppercase tracking-widest block font-display">
                {language === 'BM' ? 'JUMLAH KASAR PEMBAYARAN TENANT' : 'TOTAL TENANT GROSS PAYMENT'}
              </span>
              <span className="text-4xl font-extrabold tracking-tight text-slate-850 font-mono block">
                {formatCurrency(breakdown.totalTenantPayment)}
              </span>
              <span className="text-[10px] text-slate-500 font-bold block">
                {language === 'BM' 
                  ? 'Jumlah kelayakan kasar deposit & sewaan sebelum sebarang penolakan' 
                  : 'Total gross deposits & rental fee before booking transit'}
              </span>
            </div>

          </div>
        )}

        {/* TAB 4: OWNER NET PAYOUT STATEMENT */}
        {activeTab === 'landlord' && (
          <div id="content-landlord" className="space-y-6 animate-fadeIn font-sans">
            
            <div className="p-3 bg-[#D6CDE6]/10 border border-[#D6CDE6]/40 text-slate-700 rounded-xl flex items-start gap-2">
              <Info size={15} className="mt-0.5 shrink-0 text-slate-500" />
              <p className="text-[10px] leading-relaxed font-semibold text-slate-650">
                {language === 'BM' 
                  ? 'Penerangan baki dan senarai Deposit kepada Owner. Item Documents & Stamping dibayar terus kepada ejen dan tidak termasuk dalam baki pemilik.'
                  : 'Breakdown of deposits and final balance paid to the Owner. Documents & Stamping are paid directly to the agent and are not included in the owner\'s balance.'}
              </p>
            </div>

            {/* A. BOOKING & AGENCY FEE */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-display">
                <span className="w-1.5 h-1.5 bg-[#BDD7EE] rounded-full animate-pulse"></span>
                A. BOOKING & AGENCY FEE
              </h4>
              <div className="flex justify-between items-center text-xs text-slate-600 font-mono">
                <span className="font-semibold">Booking (Incl. 8% SST):</span>
                <span className="font-mono font-bold text-slate-800 text-sm">{formatCurrency(breakdown.bookingFeePaid)}</span>
              </div>
            </div>

            {/* B. DOCUMENTATION & STAMPING */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-display">
                <span className="w-1.5 h-1.5 bg-[#FCDAD7] rounded-full animate-pulse"></span>
                B. DOCUMENTATION & STAMPING
              </h4>
              <div className="flex justify-between items-center text-xs text-slate-600 font-mono">
                <span className="font-semibold">Documentation Fee:</span>
                <span className="font-mono font-bold text-slate-800 text-sm font-semibold">{formatCurrency(breakdown.stampingFee)}</span>
              </div>
            </div>

            {/* C. BALANCE TO OWNER */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 md:p-5 space-y-4">
              <h4 className="text-xs font-bold text-slate-850 uppercase tracking-wider border-b border-slate-100 pb-2 flex items-center gap-1.5 font-display">
                <span className="w-1.5 h-1.5 bg-[#D6CDE6] rounded-full animate-pulse"></span>
                {language === 'BM' 
                  ? 'C. BALANCE TO OWNER' 
                  : 'C. BALANCE TO OWNER'}
              </h4>
              
              <div className="space-y-2 font-mono text-xs text-slate-600">
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-semibold">1st Month Advance:</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(breakdown.advanceRental)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-semibold">Security Deposit:</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(breakdown.securityDeposit)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-semibold">Utility Deposit:</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(breakdown.utilityDeposit)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-semibold">Access Card:</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(breakdown.accessCardDeposit)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                  <span className="font-semibold">Others Deposit:</span>
                  <span className="text-slate-800 font-bold">{formatCurrency(breakdown.othersDeposit)}</span>
                </div>
                <div className="flex justify-between items-center py-1.5 border-b border-slate-100 text-amber-600 border-dashed">
                  <span className="font-semibold">Minus Booking Fee:</span>
                  <span className="font-bold flex items-center gap-1">-{formatCurrency(breakdown.bookingFeePaid)}</span>
                </div>
              </div>

              {/* Highlighter amount to owner resembling booking fee highlight in lavender background */}
              <div className="bg-[#D6CDE6]/20 border-2 border-[#D6CDE6]/80 rounded-2xl p-6 text-center shadow-xs space-y-2 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-3 opacity-10 text-slate-400">
                  <Coins size={44} />
                </div>
                <span className="text-xs font-black text-slate-655 uppercase tracking-widest block font-display">
                  {language === 'BM' ? 'BALANCE TO OWNER' : 'BALANCE TO OWNER'}
                </span>
                <span className="text-4xl font-extrabold tracking-tight text-slate-900 font-mono block animate-fadeIn">
                  {formatCurrency(breakdown.ownerBalance)}
                </span>
                <span className="text-xs text-slate-500 font-bold block mt-1 pt-0.5 tracking-wide uppercase">
                  Balance due upon key handover
                </span>
              </div>
            </div>

          </div>
        )}

      </div>

      {/* VERIFY STATS */}
      <div className="flex justify-between items-center text-[10px] text-slate-400 border-t border-slate-100 pt-4 font-semibold" id="payout-stamp-stat flex">
        <span>{t.preparedBy}: <strong className="text-slate-700 font-extrabold font-display">{inputs.agentName || 'Hj Anuar Bin Ibrahim'}</strong></span>
        <span>{new Date().toLocaleDateString(language === 'BM' ? 'ms-MY' : 'en-US')}</span>
      </div>

      {/* ACTION BUTTONS */}
      <div className="pt-2 space-y-2.5" id="results-copy-actions">
        <button
          type="button"
          onClick={handleCopy}
          id="btn-copy-wa-receipt"
          className={`w-full py-3.5 rounded-xl cursor-pointer shadow-md font-display font-bold text-sm text-white transition-all duration-300 flex justify-center items-center gap-2 ${
            copied 
              ? 'bg-emerald-700 shadow-xs scale-98' 
              : 'bg-emerald-600 hover:bg-emerald-500 hover:shadow-lg'
          }`}
        >
          {copied ? <Check size={18} className="animate-pulse" /> : <Copy size={16} />}
          <span>{copied ? t.copiedMsg : t.copyWabtn}</span>
        </button>

        {onOpenDrive && (
          <button
            type="button"
            onClick={onOpenDrive}
            id="btn-save-drive-results"
            className="w-full py-3 rounded-xl cursor-pointer border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-display font-bold text-xs transition-all duration-200 flex justify-center items-center gap-2 shadow-2xs hover:shadow-xs"
          >
            <UploadCloud size={16} className="text-emerald-600" />
            <span>{language === 'BM' ? 'Simpan / Urus di Google Drive' : 'Save / Manage in Google Drive'}</span>
          </button>
        )}
      </div>

      {/* COMPACT PHYSICAL SLIP RECEIPT DESIGN FOR PRINT MEDIA ONLY */}
      <div className="hidden print:block print:bg-white print:text-black print:p-6" id="printed-thermal-slip">
        <div className="text-center space-y-1 pb-4 border-b border-double border-slate-405">
          <h1 className="text-lg font-bold font-display text-center">HAB RENTCALC</h1>
          <p className="text-xs font-mono font-semibold">A PROP AGENT TOOL • Kalkulator Sewa</p>
          <p className="text-[10px] font-mono text-slate-500">Rujukan Sebut Harga Deposit & Baki (Ver 5.0)</p>
        </div>

        <div className="space-y-2 py-4 border-b border-dashed border-slate-405 font-mono text-xs">
          <div className="flex justify-between">
            <span>Hartanah:</span>
            <span className="font-bold">{inputs.propertyName || '-'}</span>
          </div>
          <div className="flex justify-between">
            <span>Sewa Bulanan:</span>
            <span>{formatCurrency(breakdown.monthlyRent)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Security Deposit (2m):</span>
            <span>{formatCurrency(breakdown.securityDeposit)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Utility Deposit (0.5m):</span>
            <span>{formatCurrency(breakdown.utilityDeposit)}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Documents / Legal Stamp:</span>
            <span>{stampStr}</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Advance 1st Month Rent:</span>
            <span>{formatCurrency(breakdown.advanceRental)}</span>
          </div>
        </div>

        <div className="space-y-1 py-4 border-b border-double border-slate-445 font-mono text-xs">
          <div className="flex justify-between font-extrabold text-sm">
            <span>JUMLAH TENANT:</span>
            <span>{formatCurrency(breakdown.totalTenantPayment)}</span>
          </div>
          <div className="flex justify-between text-slate-500 text-[10px]">
            <span>Wang Booking Agensi (-):</span>
            <span>{formatCurrency(breakdown.bookingFeePaid)}</span>
          </div>
          <div className="flex justify-between font-extrabold text-sm pt-1.5 border-t border-slate-205">
            <span>BAKI PADA SIGN AMBIL KUNCI:</span>
            <span>{formatCurrency(breakdown.balanceTenantToPay)}</span>
          </div>
        </div>

        <div id="print-payout-owner" className="py-4 font-mono text-xs border-b border-dashed border-slate-445 space-y-1">
          <div className="flex justify-between font-extrabold">
            <span>BAKI UNTUK OWNER:</span>
            <span>{formatCurrency(breakdown.ownerBalance)}</span>
          </div>
          <div className="text-[10px] text-slate-500">
            Formulasi: (Sekuriti + Utiliti + Sewa Pertama) - Agensi Komisyen dengan Cukai SST
          </div>
        </div>

        <div className="text-center pt-6 space-y-1 font-mono text-[10px] text-slate-600">
          <p>Terima Kasih Kerana Menggunakan HAB RentCalc</p>
          <p>Disediakan Oleh: {inputs.agentName || 'Hj Anuar Bin Ibrahim'}</p>
          <p>{new Date().toLocaleString()}</p>
        </div>
      </div>

    </div>
  );
}
