/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CalculatorInputs, CalculationBreakdown, Language } from './types';

// Translation dictionaries for Bilingual Support (Bahasa Malaysia & English)
export const TRANSLATIONS = {
  BM: {
    title: 'HAB RentCalc',
    subtitle: 'A PROP AGENT TOOL',
    subdesc: 'Kalkulator Deposit & Ringkasan Sewaan',
    propName: 'Nama Properti',
    propPlaceholder: 'cth. Residensi Al-Aqarat, Gombak',
    monthlyRent: 'Sewa Bulanan (RM)',
    bookingAgency: 'Pilihan Booking Agency',
    utilityDeposit: 'Utility Deposit',
    documentsStamping: 'Pilihan Documents & Stamping',
    accessCard: 'Access Card Deposit (RM)',
    othersDeposit: 'Others Deposit (RM)',
    agencySection: 'Maklumat Agensi (Auto-Save)',
    agencyName: 'Nama Agensi',
    agencyBank: 'Bank & No. Akaun Agensi',
    agentSection: 'Maklumat Ejen (Auto-Save)',
    agentName: 'Nama Ejen',
    agentBank: 'Bank & No. Akaun',
    generateBtn: 'JANA MAKLUMAT PEMBAYARAN',
    refFormulas: 'Rujukan Formula Kalkulator',
    refExplanation: 'Gunakan panel ini untuk mengesahkan formula pengiraan deposit, yuran agensi, dan baki akhir pemilik untuk mengelakkan sebarang kesilapan.',
    
    // Dropdown options
    booking_1_25_SST: '1.25 Bulan (25% Lebih) + 8% SST',
    booking_1_00_SST: '1 Bulan + 8% SST',
    booking_1_25_NO_SST: '1.25 Bulan (Tanpa SST)',
    booking_1_00_NO_SST: '1 Bulan (Tanpa SST)',
    booking_custom: 'Custom Nyatakan Amaun (RM)',

    sec_2_0: '2 Bulan (Asal/Standard)',
    sec_1_0: '1 Bulan',
    sec_1_5: '1.5 Bulan',
    sec_0_0: 'Tiada Deposit Sekuriti',
    sec_custom: 'Custom Jumlah Sekuriti (RM)',

    util_0_5: '0.5 Bulan (Asal/Standard)',
    util_1_0: '1 Bulan',
    util_fixed_500: 'Tetap RM 500',
    util_fixed_1000: 'Tetap RM 1,000',
    util_0_0: 'Tiada Deposit Utiliti',
    util_custom: 'Custom Jumlah Utiliti (RM)',

    stamp_30: '30% daripada Sewa (Standard)',
    stamp_25: '25% daripada Sewa',
    stamp_lhdn: 'Formula LHDN Standard (Tenancy 1-3 Tahun)',
    stamp_fixed_300: 'Tetap RM 300',
    stamp_fixed_400: 'Tetap RM 400',
    stamp_0_0: 'Tiada Kos Dokumen',
    stamp_custom: 'Custom Kos Dokumen (RM)',

    // Formula Titles & Labels
    f_rent: 'Sewa Sewajarnya',
    f_security: 'Deposit Sekuriti Ketetapan',
    f_utility: 'Deposit Utiliti Ketetapan',
    f_stamping: 'Documents & Stamping (Dibayar kepada Ejen)',
    f_agency_fee: 'Professional Agency Fee',
    f_sst: 'Cukai Perkhidmatan (8% SST)',
    f_total_agency: 'Jumlah Komisyen Agensi',
    f_tenant_total: 'Gross Total Dibayar Tenant',
    f_owner_balance: 'Baki Bersih Pemilik (Baki Owner)',
    f_tenant_balance: 'Baki Tenant Semasa Terima Kunci',
    f_booking_earnest: 'Booking Pembayaran Awal',

    // Receipts / Results
    resultsTitle: 'RINGKASAN SEBUT HARGA & PEMBAYARAN',
    ownerPayoutTitle: 'RINGKASAN PEMBAYARAN KEPADA OWNER',
    agencyBillTitle: 'RINGKASAN KOMISYEN & YURAN AGENSI',
    receiptFor: 'Hartanah',
    monthlyRentRent: 'Kadar Sewa',
    calcSummary: 'Breakdown Pengiraan',
    totalDepositsLabel: 'Jumlah Deposit Sewa',
    totalTenantNet: 'Jumlah Wang yang Tenant Perlu Bayar',
    alreadyPaid: 'Booking Telah Dibayar',
    toPayNow: 'Baki Perlu Dibayar Semasa Serah Kunci',
    ownerEntitlement: 'Hak Pemilik Kasar (Gross)',
    minusAgencyFee: 'Ditolak: Komisyen Agensi & SST',
    nettOwnerPayout: 'Baki Bersih Dipindahkan Ke Owner (Nett)',
    paymentTo: 'Sila Buat Pembayaran Kepada:',
    bankAcc: 'Bank & No Akaun',
    preparedBy: 'Disediakan Oleh',
    copiedMsg: 'Berjaya disalin ke Papan Keratan! Sedia ditampal di WhatsApp.',
    copyWabtn: 'Salin Format Mesej WhatsApp 📱',
    verifiedCheckbox: 'Sahkan Formula Pengiraan di Atas',
    verifiedNote: 'Formula ini disemak dan mematuhi standard pengiraan HAB RentCalc Ver 5.0.',

    // Formulas detail
    detailSecFormula: 'Formula: Sewa × Bulan Deposit',
    detailUtilFormula: 'Formula: Sewa × Bulan Utiliti atau Nilai Tetap',
    detailStampingFormula: 'Kos penyediaan Perjanjian Sewa dan urusan Stamping oleh Ejen',
    detailAgencyFormula: 'Formula: Yuran Agensi × Kadar Booking + 8% SST',
    detailOwnerFormula: 'Formula: (Sekuriti + Utiliti + Sewa Pertama + Kad) - Yuran Agensi dengan % SST',
    detailsExplain: 'Penerangan Aliran Wang:',
    detailsExplanationText: 'Tenant membayar Booking (Sewa Bulan Pertama x rate) bagi mengunci unit (lock unit) + Documentation dan kos stamping (dipegang ejen). Booking ini dipegang oleh Agensi sebagai Komisyen Profesional. Semasa tandatangan perjanjian Tenant membayar baki deposit  + baki sewa. Owner akan menerima baki deposit bersih selepas ditolak komisyen agensi sepenuhnya.',

    footerText: 'HAB RentCalc Ver 5.0 • Hak Cipta Terpelihara Hj Anuar Bin Ibrahim'
  },
  EN: {
    title: 'HAB RentCalc',
    subtitle: 'A PROP AGENT TOOL',
    subdesc: 'Deposit Calculator & Rental Summary',
    propName: 'Property Name',
    propPlaceholder: 'e.g. Al-Aqarat Residency, Gombak',
    monthlyRent: 'Monthly Rent (RM)',
    bookingAgency: 'Agency Booking Option',
    utilityDeposit: 'Utility Deposit',
    documentsStamping: 'Documents & Stamping Option',
    accessCard: 'Access Card Deposit (RM)',
    othersDeposit: 'Others Deposit (RM)',
    agencySection: 'Agency Details (Auto-Save)',
    agencyName: 'Agency Name',
    agencyBank: 'Agency Bank & Account No.',
    agentSection: 'Agent Details (Auto-Save)',
    agentName: 'Agent Name',
    agentBank: 'Bank & Account No.',
    generateBtn: 'GENERATE PAYMENT DETAILS',
    refFormulas: 'Calculator Formula Reference',
    refExplanation: 'Use this panel to verify the deposit, agency fee, and final owner payout formulas to prevent any calculation mistakes.',
    
    booking_1_25_SST: '1.25 Months (25% More) + 8% SST',
    booking_1_00_SST: '1 Month + 8% SST',
    booking_1_25_NO_SST: '1.25 Months (No SST)',
    booking_1_00_NO_SST: '1 Month (No SST)',
    booking_custom: 'Custom Specify Amount (RM)',

    sec_2_0: '2 Months (Original/Standard)',
    sec_1_0: '1 Month',
    sec_1_5: '1.5 Months',
    sec_0_0: 'No Security Deposit',
    sec_custom: 'Custom Security Amount (RM)',

    util_0_5: '0.5 Month (Original/Standard)',
    util_1_0: '1 Month',
    util_fixed_500: 'Fixed RM 500',
    util_fixed_1000: 'Fixed RM 1,000',
    util_0_0: 'No Utility Deposit',
    util_custom: 'Custom Utility Amount (RM)',

    stamp_30: '30% of Rent (Standard)',
    stamp_25: '25% of Rent',
    stamp_lhdn: 'Standard LHDN Formula (Tenancy 1-3 Years)',
    stamp_fixed_300: 'Fixed RM 300',
    stamp_fixed_400: 'Fixed RM 400',
    stamp_0_0: 'No Documents Cost',
    stamp_custom: 'Custom Documents Cost (RM)',

    f_rent: 'Regular Rent',
    f_security: 'Security Deposit Term',
    f_utility: 'Utility Deposit Term',
    f_stamping: 'Documents & Stamping (Paid to Agent)',
    f_agency_fee: 'Professional Agency Fee',
    f_sst: 'Service Tax (8% SST)',
    f_total_agency: 'Total Agency Commission',
    f_tenant_total: 'Tenant Gross Total Due',
    f_owner_balance: 'Net Owner Payout (Owner Balance)',
    f_tenant_balance: 'Tenant Balance of Key Collection',
    f_booking_earnest: 'Initial Booking Payment',

    resultsTitle: 'QUOTATION & PAYMENT SUMMARY',
    ownerPayoutTitle: 'OWNER PAYOUT STATEMENT',
    agencyBillTitle: 'AGENCY FEES & COMMISSION INVOICE',
    receiptFor: 'Property',
    monthlyRentRent: 'Rental Rate',
    calcSummary: 'Calculation Breakdown',
    totalDepositsLabel: 'Total Rental Deposits',
    totalTenantNet: 'Total Amount to be Paid by Tenant',
    alreadyPaid: 'Paid Booking Fee',
    toPayNow: 'Balance Due Upon key handover',
    ownerEntitlement: 'Gross Owner Entitlement',
    minusAgencyFee: 'Less: Agency Commission & SST',
    nettOwnerPayout: 'Net Owner Payout (Nett)',
    paymentTo: 'Please Make Payment To:',
    bankAcc: 'Bank & Account No.',
    preparedBy: 'Prepared By',
    copiedMsg: 'Copied to clipboard successfully! Ready for WhatsApp pasting.',
    copyWabtn: 'Copy WhatsApp Message Format 📱',
    verifiedCheckbox: 'Confirm Calculation Formula Above',
    verifiedNote: 'This formula is audited and is mathematically compliant with HAB RentCalc Ver 5.0 standards.',

    detailSecFormula: 'Formula: Rent × Deposit Months',
    detailUtilFormula: 'Formula: Rent × Utility Months or Fixed Value',
    detailStampingFormula: 'Tenancy Agreement preparation and Stamping handled by Agent',
    detailAgencyFormula: 'Formula: Agency Fee × Booking Rate + 8% SST',
    detailOwnerFormula: 'Formula: (Security + Utility + Advance Rent + Cards) - Agency Fee with SST %',
    detailsExplain: 'Cash Flow Explanation:',
    detailsExplanationText: 'The tenant pays the Booking Fee (First Month Rent x Rate) + Documentation & Stamping Fee to secure the unit. This booking is retained by the agency as their Professional Commission. Upon signing the Tenancy Agreement, the tenant pays the balance deposits + any other balances. The landlord receives their net deposits after deducting agency commission in full.',

    footerText: 'HAB RentCalc Ver 5.0 • All Rights Reserved Hj Anuar Bin Ibrahim'
  }
};

/**
 * Calculates standard LHDN stamp duty for a 1-year to 3-year tenancy in Malaysia.
 * First RM 2,400 of annual rent is exempt. Every RM 250 of annual excess costs RM 2.00 (Standard 1-3 year tenancy).
 */
export function calculateLhdnStamping(monthlyRent: number): number {
  const annualRent = monthlyRent * 12;
  if (annualRent <= 2400) return 10; // Nominal minimum
  const excess = annualRent - 2400;
  const blocks = Math.ceil(excess / 250);
  const stampDuty = blocks * 2; // For 1-3 years tenancy
  // Add RM 10-20 processing or copy stamp duty fee
  return stampDuty + 10; 
}

/**
 * Solves the complete calculations based on the inputs provided by the user
 */
export function solveCalculation(inputs: CalculatorInputs): CalculationBreakdown {
  const R = Number(inputs.monthlyRent) || 0;

  // 1. Calculate Security Deposit
  let securityDeposit = 0;
  switch (inputs.securityDepositOption) {
    case '2.0':
      securityDeposit = R * 2.0;
      break;
    case '1.0':
      securityDeposit = R * 1.0;
      break;
    case '1.5':
      securityDeposit = R * 1.5;
      break;
    case '0.0':
      securityDeposit = 0;
      break;
    case 'CUSTOM':
      securityDeposit = Number(inputs.customSecurityDepositAmount) || 0;
      break;
  }

  // 2. Calculate Utility Deposit
  let utilityDeposit = 0;
  switch (inputs.utilityDepositOption) {
    case '0.5':
      utilityDeposit = R * 0.5;
      break;
    case '1.0':
      utilityDeposit = R * 1.0;
      break;
    case '0.0':
      utilityDeposit = 0;
      break;
    case 'CUSTOM':
      utilityDeposit = Number(inputs.customUtilityDepositAmount) || 0;
      break;
  }

  // 3. Advance rental is always 1 Month Rent
  const advanceRental = R;

  // 4. Access card and other deposits
  const accessCardDeposit = Number(inputs.accessCardDeposit) || 0;
  const othersDeposit = Number(inputs.othersDeposit) || 0;

  // 5. Stamping / Document fee
  let stampingFee = 0;
  switch (inputs.stampingOption) {
    case '30_PERCENT':
      stampingFee = R * 0.30;
      break;
    case '25_PERCENT':
      stampingFee = R * 0.25;
      break;
    case '0.0':
      stampingFee = 0;
      break;
    case 'CUSTOM':
      stampingFee = Number(inputs.customStampingAmount) || 0;
      break;
  }

  // 6. Gross total amount paid by the tenant
  const totalTenantPayment = securityDeposit + utilityDeposit + advanceRental + accessCardDeposit + othersDeposit + stampingFee;

  // 7. Booking agency professional fee & SST
  let agencyProfessionalFee = 0;
  let hasSst = false;

  switch (inputs.bookingOption) {
    case '1.25_SST':
      agencyProfessionalFee = R * 1.25;
      hasSst = true;
      break;
    case '1.00_SST':
      agencyProfessionalFee = R * 1.00;
      hasSst = true;
      break;
    case '1.25_NO_SST':
      agencyProfessionalFee = R * 1.25;
      hasSst = false;
      break;
    case '1.00_NO_SST':
      agencyProfessionalFee = R * 1.00;
      hasSst = false;
      break;
    case 'CUSTOM':
      agencyProfessionalFee = Number(inputs.customBookingAmount) || 0;
      hasSst = false; // Custom usually implies flat fee
      break;
  }

  const agencySst = hasSst ? agencyProfessionalFee * 0.08 : 0;
  const totalAgencyFeeWithSst = agencyProfessionalFee + agencySst;

  // 8. booking fee paid by tenant upfront is equal to sewa x pilihan % booking agent + sst
  const bookingFeePaid = totalAgencyFeeWithSst;

  // 9. Balance tenant has to pay upon key delivery / tenancy signing
  const balanceTenantToPay = totalTenantPayment - bookingFeePaid;

  // 10. Owners Gross & Net payout computation
  // Owner is entitled to security deposit + utility deposit + advance rental (1 month rent) + access card + others
  const ownerGrossEntitlement = securityDeposit + utilityDeposit + advanceRental + accessCardDeposit + othersDeposit;
  
  // Custom owners balance = ownerGrossEntitlement - totalAgencyFeeWithSst
  const ownerBalance = ownerGrossEntitlement - totalAgencyFeeWithSst;

  // Check if initial tenant booking covers the full agency fee + SST. 
  // If yes, then owner gets baki. If no, the agency fee remainder to be settled is totalAgencyFeeWithSst - bookingFeePaid
  const remainingAgencyFeeToSettled = Math.max(0, totalAgencyFeeWithSst - bookingFeePaid);

  return {
    monthlyRent: R,
    securityDeposit,
    utilityDeposit,
    advanceRental,
    accessCardDeposit,
    othersDeposit,
    stampingFee,
    totalTenantPayment,
    agencyProfessionalFee,
    agencySst,
    totalAgencyFeeWithSst,
    bookingFeePaid,
    balanceTenantToPay,
    ownerGrossEntitlement,
    ownerBalance,
    remainingAgencyFeeToSettled
  };
}

/**
 * Formats a number consistently into RM currency format (RM X,XXX.XX)
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('ms-MY', {
    style: 'currency',
    currency: 'MYR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
}

/**
 * Generates a clean WhatsApp layout ready to copy for clients or owners
 */
export function generateWhatsAppMessage(
  inputs: CalculatorInputs,
  b: CalculationBreakdown,
  lang: Language
): string {
  const t = TRANSLATIONS[lang];
  const stampStr = formatCurrency(b.stampingFee);
  
  const secMonths = b.monthlyRent > 0 ? b.securityDeposit / b.monthlyRent : 0;
  const utilMonths = b.monthlyRent > 0 ? b.utilityDeposit / b.monthlyRent : 0;

  const formattedSecMonths = secMonths % 1 === 0 ? secMonths.toString() : secMonths.toFixed(1);
  const formattedUtilMonths = utilMonths % 1 === 0 ? utilMonths.toString() : utilMonths.toFixed(1);

  if (lang === 'BM') {
    const stampingDetailsBM = b.stampingFee > 0 ? `• Kos Documents & Stamping: *${stampStr}*\n` : '';

    return `📌 *Butiran Hartanah & Sewa:*\n` +
      `• HARTANAH: *${inputs.propertyName || '-'}*\n` +
      `• KADAR SEWA: *${formatCurrency(b.monthlyRent)}/bulan*\n\n` +
      `💰 *Pecahan Deposit Sewa (Tenant):*\n` +
      `• Sewa Advance (Bulan Pertama): *${formatCurrency(b.advanceRental)}*\n` +
      `• ${formattedSecMonths} Bulan Deposit Sekuriti: *${formatCurrency(b.securityDeposit)}*\n` +
      `• ${formattedUtilMonths} Bulan Deposit Utiliti: *${formatCurrency(b.utilityDeposit)}*\n` +
      stampingDetailsBM +
      (b.accessCardDeposit > 0 ? `• Deposit Kad Akses: *${formatCurrency(b.accessCardDeposit)}*\n` : '') +
      (b.othersDeposit > 0 ? `• Deposit Lain-lain: *${formatCurrency(b.othersDeposit)}*\n` : '') +
      `---------------------------------\n` +
      `*JUMLAH KASAR PEMBAYARAN TENANT: ${formatCurrency(b.totalTenantPayment)}*\n\n` +
      `🏦 *Untuk Tempahan unit, sila buat pembayaran kepada saluran berikut:*\n` +
      `Booking Fee (Ke Agensi):\n` +
      `👉 *${formatCurrency(b.bookingFeePaid)}*\n` +
      `👉 ${inputs.agencyName || '-'} (${inputs.agencyBank || '-'})\n\n` +
      (b.stampingFee > 0 ? 
        `Kos Dokumen & Stamping (Ke Ejen):\n` +
        `👉 *${stampStr}*\n` +
        `👉 ${inputs.agentName || '-'} (${inputs.agentBank || '-'})\n\n` : '') +
      `💼 *Pecahan Bayaran & Baki Kepada Owner:*\n` +
      `• Sewa Advance (Bulan Pertama): *${formatCurrency(b.advanceRental)}*\n` +
      `• Deposit Sekuriti: *${formatCurrency(b.securityDeposit)}*\n` +
      `• Deposit Utiliti: *${formatCurrency(b.utilityDeposit)}*\n` +
      (b.accessCardDeposit > 0 ? `• Deposit Kad Akses: *${formatCurrency(b.accessCardDeposit)}*\n` : '') +
      (b.othersDeposit > 0 ? `• Deposit Lain-lain: *${formatCurrency(b.othersDeposit)}*\n` : '') +
      `• Tolak Kos Booking Agensi: *-${formatCurrency(b.bookingFeePaid)}*\n` +
      `• *BAKI BERSIH UNTUK OWNER: ${formatCurrency(b.ownerBalance)}*\n\n` +
      `_Disediakan Oleh: ${inputs.agentName || 'Hj Anuar Bin Ibrahim'}_\n\n` +
      `_Dijana melalui HAB RentCalc Ver 5.0_`;
  } else {
    const stampingDetailsEN = b.stampingFee > 0 ? `• Documents & Stamping Fee: *${stampStr}*\n` : '';

    return `📌 *Property & Rental Details:*\n` +
      `• PROPERTY: *${inputs.propertyName || '-'}*\n` +
      `• RENTAL RATE: *${formatCurrency(b.monthlyRent)}/month*\n\n` +
      `💰 *Tenant Deposit Breakdown:*\n` +
      `• Advance Rental (1st Month): *${formatCurrency(b.advanceRental)}*\n` +
      `• ${formattedSecMonths} Months Security Deposit: *${formatCurrency(b.securityDeposit)}*\n` +
      `• ${formattedUtilMonths} Month Utility Deposit: *${formatCurrency(b.utilityDeposit)}*\n` +
      stampingDetailsEN +
      (b.accessCardDeposit > 0 ? `• Access Card Deposit: *${formatCurrency(b.accessCardDeposit)}*\n` : '') +
      (b.othersDeposit > 0 ? `• Other Deposit: *${formatCurrency(b.othersDeposit)}*\n` : '') +
      `---------------------------------\n` +
      `*GROSS TOTAL AMOUNT DUE: ${formatCurrency(b.totalTenantPayment)}*\n\n` +
      `🏦 *To Book the unit, please transfer payments to the following channels:*\n` +
      `Booking Fee (To Agency):\n` +
      `👉 *${formatCurrency(b.bookingFeePaid)}*\n` +
      `👉 ${inputs.agencyName || '-'} (${inputs.agencyBank || '-'})\n\n` +
      (b.stampingFee > 0 ? 
        `Documents & Stamping Fee (To Agent):\n` +
        `👉 *${stampStr}*\n` +
        `👉 ${inputs.agentName || '-'} (${inputs.agentBank || '-'})\n\n` : '') +
      `💼 *Payout Breakdown & Balance to Owner:*\n` +
      `• 1st Month Advance Rent: *${formatCurrency(b.advanceRental)}*\n` +
      `• Security Deposit: *${formatCurrency(b.securityDeposit)}*\n` +
      `• Utility Deposit: *${formatCurrency(b.utilityDeposit)}*\n` +
      (b.accessCardDeposit > 0 ? `• Access Card Deposit: *${formatCurrency(b.accessCardDeposit)}*\n` : '') +
      (b.othersDeposit > 0 ? `• Other Deposit: *${formatCurrency(b.othersDeposit)}*\n` : '') +
      `• Less Agency Booking Fee: *-${formatCurrency(b.bookingFeePaid)}*\n` +
      `• *NET BALANCE TO OWNER: ${formatCurrency(b.ownerBalance)}*\n\n` +
      `_Prepared By: ${inputs.agentName || 'Hj Anuar Bin Ibrahim'}_\n\n` +
      `_Generated via HAB RentCalc Ver 5.0_`;
  }
}
