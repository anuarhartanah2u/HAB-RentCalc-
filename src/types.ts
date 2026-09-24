/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'BM' | 'EN';

export interface AgentProfile {
  name: string;
  bankDetails: string;
}

export type BookingOption = 
  | '1.25_SST'   // 1.25 Bulan + 8% SST (Default in SS)
  | '1.00_SST'   // 1.00 Bulan + 8% SST
  | '1.25_NO_SST'// 1.25 Bulan (Tanpa SST)
  | '1.00_NO_SST'// 1.00 Bulan (Tanpa SST)
  | 'CUSTOM';    // Custom RM

export type SecurityDepositOption =
  | '2.0'        // 2 Bulan (Standard)
  | '1.0'        // 1 Bulan
  | '1.5'        // 1.5 Bulan
  | '0.0'        // Tiada
  | 'CUSTOM';    // Custom RM

export type UtilityDepositOption =
  | '0.5'        // 0.5 Bulan (Asal/Standard)
  | '1.0'        // 1 Bulan
  | '0.0'        // Tiada
  | 'CUSTOM';    // Custom RM

export type StampingOption =
  | '30_PERCENT' // 30% daripada Sewa (Default)
  | '25_PERCENT' // 25% daripada Sewa
  | '0.0'        // Tiada
  | 'CUSTOM';    // Custom RM

export interface CalculatorInputs {
  propertyName: string;
  monthlyRent: number;
  bookingOption: BookingOption;
  customBookingAmount: number;
  securityDepositOption: SecurityDepositOption;
  customSecurityDepositAmount: number;
  utilityDepositOption: UtilityDepositOption;
  customUtilityDepositAmount: number;
  stampingOption: StampingOption;
  customStampingAmount: number;
  accessCardDeposit: number;
  othersDeposit: number;
  agencyName: string;
  agencyBank: string;
  agentName: string;
  agentBank: string;
}

export interface CalculationBreakdown {
  monthlyRent: number;
  // Security deposit
  securityDeposit: number;
  // Utility deposit
  utilityDeposit: number;
  // First month rent
  advanceRental: number;
  // Access card
  accessCardDeposit: number;
  // Others
  othersDeposit: number;
  // Stamping/Agreement
  stampingFee: number;
  // Total tenant must pay
  totalTenantPayment: number;
  // Agency booking fee commission
  agencyProfessionalFee: number;
  agencySst: number;
  totalAgencyFeeWithSst: number;
  // Baki Tenant Semasa Sign
  bookingFeePaid: number; // usually equal to 1 month rent or booking selected
  balanceTenantToPay: number;
  // Owner Balance
  ownerGrossEntitlement: number;
  ownerBalance: number; // how much owner gets net
  remainingAgencyFeeToSettled: number; // if booking didn't cover the full agency fee + SST
}
