/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithPopup, 
  GoogleAuthProvider, 
  onAuthStateChanged, 
  User, 
  signOut 
} from 'firebase/auth';
import firebaseConfig from '../firebase-applet-config.json';
import { CalculatorInputs, CalculationBreakdown, Language } from './types';
import { generateWhatsAppMessage, formatCurrency } from './utils';

// Google Workspace Scopes
export const SCOPES = [
  'https://www.googleapis.com/auth/drive',
  'https://www.googleapis.com/auth/drive.file',
  'https://www.googleapis.com/auth/drive.metadata'
];

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider();
SCOPES.forEach(scope => provider.addScope(scope));
provider.setCustomParameters({
  prompt: 'select_account'
});

// Flag to indicate ongoing sign-in
let isSigningIn = false;
// In-memory token cache (never stored in localStorage/sessionStorage)
let cachedAccessToken: string | null = null;

export const initAuth = (
  onAuthSuccess?: (user: User, token: string) => void,
  onAuthFailure?: () => void
) => {
  return onAuthStateChanged(auth, async (user: User | null) => {
    if (user) {
      if (cachedAccessToken) {
        if (onAuthSuccess) onAuthSuccess(user, cachedAccessToken);
      } else if (!isSigningIn) {
        // If user is logged in via Firebase session but access token is not yet in memory,
        // user can sign in via button to acquire fresh Google OAuth token
        if (onAuthSuccess) onAuthSuccess(user, '');
      }
    } else {
      cachedAccessToken = null;
      if (onAuthFailure) onAuthFailure();
    }
  });
};

export const googleSignIn = async (): Promise<{ user: User; accessToken: string } | null> => {
  try {
    isSigningIn = true;
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    if (!credential?.accessToken) {
      throw new Error('Failed to obtain Google Drive access token from authentication');
    }

    cachedAccessToken = credential.accessToken;
    return { user: result.user, accessToken: cachedAccessToken };
  } catch (error: any) {
    console.error('Google Sign-In Error:', error);
    throw error;
  } finally {
    isSigningIn = false;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  return cachedAccessToken;
};

export const logout = async (): Promise<void> => {
  await signOut(auth);
  cachedAccessToken = null;
};

export interface DriveQuotationFile {
  id: string;
  name: string;
  createdTime: string;
  modifiedTime?: string;
  webViewLink?: string;
  size?: string;
  description?: string;
}

const FOLDER_NAME = 'HAB RentCalc Quotations';

/**
 * Find or create the dedicated "HAB RentCalc Quotations" folder in Google Drive
 */
export async function getOrCreateRentCalcFolder(token: string): Promise<string> {
  const query = encodeURIComponent(`mimeType = 'application/vnd.google-apps.folder' and name = '${FOLDER_NAME}' and trashed = false`);
  const searchRes = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&fields=files(id,name)`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!searchRes.ok) {
    const err = await searchRes.text();
    throw new Error(`Failed to query Google Drive folder: ${err}`);
  }

  const searchData = await searchRes.json();
  if (searchData.files && searchData.files.length > 0) {
    return searchData.files[0].id;
  }

  // Create folder if not found
  const createRes = await fetch('https://www.googleapis.com/drive/v3/files', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: FOLDER_NAME,
      mimeType: 'application/vnd.google-apps.folder',
      description: 'Directory for HAB RentCalc rental deposits and quotation summaries'
    })
  });

  if (!createRes.ok) {
    const err = await createRes.text();
    throw new Error(`Failed to create Google Drive folder: ${err}`);
  }

  const folder = await createRes.json();
  return folder.id;
}

/**
 * Save current calculation breakdown to Google Drive as a formatted text summary + embedded JSON
 */
export async function saveQuotationToDrive(
  token: string,
  inputs: CalculatorInputs,
  breakdown: CalculationBreakdown,
  language: Language
): Promise<{ fileId: string; fileName: string; webViewLink?: string }> {
  const folderId = await getOrCreateRentCalcFolder(token);

  const cleanPropName = (inputs.propertyName || 'Hartanah').trim().replace(/[^a-zA-Z0-9_\-\s]/g, '');
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10);
  const timeStr = now.toTimeString().slice(0, 5).replace(':', '');
  const fileName = `HAB_RentCalc_${cleanPropName || 'Property'}_RM${Math.round(breakdown.monthlyRent)}_${dateStr}_${timeStr}.txt`;

  const waSummary = generateWhatsAppMessage(inputs, breakdown, language);

  const fullContent = 
`=============================================================
HAB RentCalc - A PROP AGENT TOOL
Kalkulator Deposit & Ringkasan Sewaan
Generated: ${now.toLocaleString()}
Property: ${inputs.propertyName || 'N/A'}
Monthly Rent: ${formatCurrency(breakdown.monthlyRent)}
=============================================================

${waSummary}

=============================================================
PAYOUT AUDIT SUMMARY:
• Monthly Rent: ${formatCurrency(breakdown.monthlyRent)}
• Advance Rent (1st Month): ${formatCurrency(breakdown.advanceRental)}
• Security Deposit: ${formatCurrency(breakdown.securityDeposit)}
• Utility Deposit: ${formatCurrency(breakdown.utilityDeposit)}
• Stamping / Legal: ${formatCurrency(breakdown.stampingFee)}
• Access Card Deposit: ${formatCurrency(breakdown.accessCardDeposit)}
• Others Deposit: ${formatCurrency(breakdown.othersDeposit)}
-------------------------------------------------------------
• GROSS TENANT TOTAL: ${formatCurrency(breakdown.totalTenantPayment)}
• Booking Paid: ${formatCurrency(breakdown.bookingFeePaid)}
• TENANT BALANCE DUE AT HANDOVER: ${formatCurrency(breakdown.balanceTenantToPay)}
• NET BALANCE TO OWNER: ${formatCurrency(breakdown.ownerBalance)}
=============================================================

--- RAW INPUT DATA (DO NOT MODIFY) ---
${JSON.stringify({ inputs, date: now.toISOString(), version: '5.0' }, null, 2)}
`;

  // Multipart upload to Google Drive
  const metadata = {
    name: fileName,
    parents: [folderId],
    description: `Rental Calculation for ${inputs.propertyName || 'Property'} (RM ${breakdown.monthlyRent}/month)`,
    mimeType: 'text/plain'
  };

  const boundary = '-------314159265358979323846';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelimiter = `\r\n--${boundary}--`;

  const multipartRequestBody =
    delimiter +
    'Content-Type: application/json; charset=UTF-8\r\n\r\n' +
    JSON.stringify(metadata) +
    delimiter +
    'Content-Type: text/plain; charset=UTF-8\r\n\r\n' +
    fullContent +
    closeDelimiter;

  const uploadRes = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body: multipartRequestBody
  });

  if (!uploadRes.ok) {
    const err = await uploadRes.text();
    throw new Error(`Failed to upload quotation to Google Drive: ${err}`);
  }

  const uploadedFile = await uploadRes.json();
  return {
    fileId: uploadedFile.id,
    fileName: uploadedFile.name,
    webViewLink: uploadedFile.webViewLink
  };
}

/**
 * List files saved in the "HAB RentCalc Quotations" folder
 */
export async function listDriveQuotations(token: string): Promise<DriveQuotationFile[]> {
  try {
    const folderId = await getOrCreateRentCalcFolder(token);
    const query = encodeURIComponent(`'${folderId}' in parents and trashed = false`);
    const res = await fetch(`https://www.googleapis.com/drive/v3/files?q=${query}&orderBy=createdTime desc&fields=files(id,name,createdTime,modifiedTime,webViewLink,size,description)&pageSize=25`, {
      headers: { Authorization: `Bearer ${token}` }
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Google Drive API error: ${err}`);
    }

    const data = await res.json();
    return data.files || [];
  } catch (error: any) {
    console.error('Error listing Drive quotations:', error);
    throw error;
  }
}

/**
 * Fetch content of a specific file from Google Drive
 */
export async function getDriveFileContent(token: string, fileId: string): Promise<string> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Failed to fetch file content: ${err}`);
  }

  return await res.text();
}

/**
 * Delete a quotation file from Google Drive (Mandatory user confirmation handled in UI)
 */
export async function deleteDriveFile(token: string, fileId: string): Promise<void> {
  const res = await fetch(`https://www.googleapis.com/drive/v3/files/${fileId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` }
  });

  if (!res.ok && res.status !== 204 && res.status !== 404) {
    const err = await res.text();
    throw new Error(`Failed to delete Google Drive file: ${err}`);
  }
}
