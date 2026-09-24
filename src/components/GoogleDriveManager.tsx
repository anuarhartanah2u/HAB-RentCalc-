/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { 
  Cloud, 
  UploadCloud, 
  FolderOpen, 
  ExternalLink, 
  Trash2, 
  Check, 
  AlertCircle, 
  Loader2, 
  LogOut, 
  RefreshCw, 
  FileText,
  X,
  RotateCcw
} from 'lucide-react';
import { 
  initAuth, 
  googleSignIn, 
  logout, 
  getAccessToken, 
  saveQuotationToDrive, 
  listDriveQuotations, 
  deleteDriveFile, 
  getDriveFileContent,
  DriveQuotationFile 
} from '../googleDrive';
import { CalculatorInputs, CalculationBreakdown, Language } from '../types';

interface GoogleDriveManagerProps {
  language: Language;
  inputs: CalculatorInputs;
  breakdown: CalculationBreakdown;
  onRestoreInputs?: (restored: CalculatorInputs) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function GoogleDriveManager({
  language,
  inputs,
  breakdown,
  onRestoreInputs,
  isOpen,
  onClose
}: GoogleDriveManagerProps) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<{ fileName: string; link?: string } | null>(null);
  const [files, setFiles] = useState<DriveQuotationFile[]>([]);
  const [isLoadingFiles, setIsLoadingFiles] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Deletion confirmation modal state (Required for destructive operations)
  const [deleteTarget, setDeleteTarget] = useState<DriveQuotationFile | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = initAuth(
      async (authUser, authToken) => {
        setUser(authUser);
        if (authToken) {
          setToken(authToken);
        } else {
          const freshToken = await getAccessToken();
          setToken(freshToken);
        }
      },
      () => {
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch files when token is available and modal is open
  useEffect(() => {
    if (isOpen && token) {
      loadFiles(token);
    }
  }, [isOpen, token]);

  const loadFiles = async (authToken: string) => {
    setIsLoadingFiles(true);
    setErrorMessage(null);
    try {
      const driveFiles = await listDriveQuotations(authToken);
      setFiles(driveFiles);
    } catch (err: any) {
      console.error('Failed to load drive files:', err);
      setErrorMessage(err.message || 'Gagal memuat fail dari Google Drive');
    } finally {
      setIsLoadingFiles(false);
    }
  };

  const handleLogin = async () => {
    setIsLoggingIn(true);
    setErrorMessage(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        await loadFiles(result.accessToken);
      }
    } catch (err: any) {
      console.error('Login error:', err);
      setErrorMessage(err.message || 'Log masuk Google gagal. Sila cuba lagi.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
    } catch (err: any) {
      console.error('Logout error:', err);
    }
  };

  const handleSaveToDrive = async () => {
    if (!token) {
      await handleLogin();
      return;
    }
    setIsSaving(true);
    setErrorMessage(null);
    setSaveSuccess(null);
    try {
      const result = await saveQuotationToDrive(token, inputs, breakdown, language);
      setSaveSuccess({ fileName: result.fileName, link: result.webViewLink });
      await loadFiles(token);
    } catch (err: any) {
      console.error('Save to drive error:', err);
      setErrorMessage(err.message || 'Gagal menyimpan ke Google Drive');
    } finally {
      setIsSaving(false);
    }
  };

  const confirmDelete = async () => {
    if (!deleteTarget || !token) return;
    setIsDeleting(true);
    try {
      await deleteDriveFile(token, deleteTarget.id);
      setDeleteTarget(null);
      await loadFiles(token);
    } catch (err: any) {
      console.error('Delete error:', err);
      setErrorMessage(err.message || 'Gagal memadam fail dari Google Drive');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleRestore = async (file: DriveQuotationFile) => {
    if (!token || !onRestoreInputs) return;
    try {
      const content = await getDriveFileContent(token, file.id);
      const rawMarker = '--- RAW INPUT DATA (DO NOT MODIFY) ---';
      const markerIndex = content.indexOf(rawMarker);
      if (markerIndex !== -1) {
        const jsonPart = content.substring(markerIndex + rawMarker.length).trim();
        const parsed = JSON.parse(jsonPart);
        if (parsed.inputs) {
          onRestoreInputs(parsed.inputs);
          onClose();
          alert(language === 'BM' ? 'Maklumat sewaan berjaya dimuat semula ke kalkulator!' : 'Rental calculation inputs restored successfully!');
        }
      } else {
        alert(language === 'BM' ? 'Fail ini tidak mengandungi format data mentah untuk dimuat semula.' : 'This file does not contain raw data payload.');
      }
    } catch (err: any) {
      console.error('Restore error:', err);
      alert(language === 'BM' ? 'Gagal memuat semula fail.' : 'Failed to restore file inputs.');
    }
  };

  if (!isOpen) return null;

  const isBM = language === 'BM';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-fadeIn" id="google-drive-modal-backdrop">
      <div 
        id="google-drive-modal-card" 
        className="bg-white rounded-3xl shadow-2xl border border-slate-200 max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden text-slate-800"
      >
        {/* Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-cyan-50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white shadow-xs border border-emerald-100 flex items-center justify-center text-emerald-600">
              <Cloud size={22} />
            </div>
            <div>
              <h3 className="font-display font-black text-slate-900 text-base md:text-lg flex items-center gap-2">
                Google Drive
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold">
                  {isBM ? 'Akaun Google' : 'Google Workspace'}
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {isBM ? 'Simpan dan urus sebut harga sewaan di Google Drive' : 'Save and organize rental quotations in Google Drive'}
              </p>
            </div>
          </div>

          <button 
            type="button" 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/80 hover:bg-white text-slate-400 hover:text-slate-700 flex items-center justify-center transition-colors shadow-2xs cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5 overflow-y-auto flex-1">
          {/* Error Message */}
          {errorMessage && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Authentication Card */}
          {!user ? (
            <div className="p-5 bg-slate-50 border border-slate-200 rounded-2xl text-center space-y-3">
              <p className="text-xs text-slate-600 font-medium leading-relaxed max-w-md mx-auto">
                {isBM 
                  ? 'Sambungkan akaun Google anda untuk menyimpan ringkasan deposit, sewa, dan sebut harga terus ke folder Google Drive anda.' 
                  : 'Connect your Google account to save rental deposit summaries, quotes, and calculations directly to your Google Drive.'}
              </p>

              {/* Official Google Sign-In Button */}
              <div className="pt-2 flex justify-center">
                <button
                  type="button"
                  onClick={handleLogin}
                  disabled={isLoggingIn}
                  id="btn-google-sign-in"
                  className="inline-flex items-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-full border border-slate-300 shadow-xs hover:shadow transition-all duration-200 cursor-pointer disabled:opacity-60"
                >
                  {isLoggingIn ? (
                    <Loader2 size={16} className="animate-spin text-slate-600" />
                  ) : (
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                  )}
                  <span>{isBM ? 'Log masuk dengan Google' : 'Sign in with Google'}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="p-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {user.photoURL ? (
                  <img 
                    src={user.photoURL} 
                    alt={user.displayName || 'Google User'} 
                    className="w-10 h-10 rounded-full border border-emerald-300"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-emerald-200 text-emerald-800 font-bold flex items-center justify-center text-xs">
                    {(user.displayName || user.email || 'G')[0].toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xs font-bold text-slate-800">{user.displayName || 'Google User'}</p>
                  <p className="text-[11px] font-mono text-slate-500">{user.email}</p>
                </div>
              </div>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 border border-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                title={isBM ? 'Log keluar Google' : 'Log out Google'}
              >
                <LogOut size={13} />
                <span>{isBM ? 'Keluar' : 'Sign out'}</span>
              </button>
            </div>
          )}

          {/* Current Calculation Save Section */}
          <div className="p-5 bg-gradient-to-br from-slate-50 to-slate-100/70 border border-slate-200 rounded-2xl space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider font-display">
                {isBM ? 'Simpan Sebut Harga Semasa' : 'Save Current Quotation'}
              </span>
              <span className="text-xs font-mono font-bold text-slate-900 bg-white px-2 py-0.5 rounded-md border border-slate-200">
                {inputs.propertyName || (isBM ? 'Tanpa Nama' : 'Unnamed')} • RM {breakdown.monthlyRent}/bln
              </span>
            </div>

            <p className="text-xs text-slate-500">
              {isBM 
                ? 'Fail akan disimpan ke folder "HAB RentCalc Quotations" di Google Drive anda lengkap dengan teks WhatsApp dan data sewaan.' 
                : 'File will be saved inside the "HAB RentCalc Quotations" folder on your Google Drive with full breakdown details.'}
            </p>

            <button
              type="button"
              onClick={handleSaveToDrive}
              disabled={isSaving}
              id="btn-confirm-save-drive"
              className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs hover:shadow transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
            >
              {isSaving ? (
                <>
                  <Loader2 size={15} className="animate-spin" />
                  <span>{isBM ? 'Menyimpan ke Google Drive...' : 'Saving to Google Drive...'}</span>
                </>
              ) : (
                <>
                  <UploadCloud size={16} />
                  <span>{isBM ? 'Simpan Sebut Harga ke Google Drive' : 'Save Quotation to Google Drive'}</span>
                </>
              )}
            </button>

            {saveSuccess && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-center justify-between gap-2 animate-fadeIn">
                <div className="flex items-center gap-2 truncate">
                  <Check size={15} className="text-emerald-600 shrink-0" />
                  <span className="truncate">{saveSuccess.fileName}</span>
                </div>
                {saveSuccess.link && (
                  <a 
                    href={saveSuccess.link} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center gap-1 font-bold text-emerald-700 hover:text-emerald-900 underline shrink-0"
                  >
                    <span>{isBM ? 'Buka' : 'Open'}</span>
                    <ExternalLink size={12} />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Drive Files List */}
          {user && (
            <div className="space-y-3 pt-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider font-display flex items-center gap-1.5">
                  <FolderOpen size={15} className="text-emerald-600" />
                  <span>{isBM ? 'Fail Sebut Harga Tersimpan' : 'Saved Quotations in Drive'}</span>
                </h4>

                <button
                  type="button"
                  onClick={() => token && loadFiles(token)}
                  disabled={isLoadingFiles}
                  className="flex items-center gap-1 text-[11px] text-slate-500 hover:text-slate-800 font-semibold cursor-pointer"
                  title={isBM ? 'Segar Semula' : 'Refresh'}
                >
                  <RefreshCw size={12} className={isLoadingFiles ? 'animate-spin' : ''} />
                  <span>{isBM ? 'Segar semula' : 'Refresh'}</span>
                </button>
              </div>

              {isLoadingFiles ? (
                <div className="py-8 text-center text-slate-400 text-xs flex flex-col items-center gap-2">
                  <Loader2 size={20} className="animate-spin text-emerald-600" />
                  <span>{isBM ? 'Menghubungkan ke Google Drive...' : 'Loading files from Google Drive...'}</span>
                </div>
              ) : files.length === 0 ? (
                <div className="p-6 text-center border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs">
                  <FileText size={28} className="mx-auto mb-2 opacity-40" />
                  <p>{isBM ? 'Belum ada fail sebut harga disimpan.' : 'No quotation files saved yet.'}</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                  {files.map((file) => (
                    <div 
                      key={file.id} 
                      className="p-3 bg-white border border-slate-200/90 rounded-xl hover:border-emerald-300 transition-colors flex items-center justify-between gap-3 text-xs shadow-2xs"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-bold text-slate-800 truncate" title={file.name}>
                          {file.name}
                        </p>
                        <p className="text-[10px] text-slate-400 font-mono">
                          {new Date(file.createdTime).toLocaleString(isBM ? 'ms-MY' : 'en-US')}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Restore button */}
                        {onRestoreInputs && (
                          <button
                            type="button"
                            onClick={() => handleRestore(file)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                            title={isBM ? 'Muat semula data ke kalkulator' : 'Restore calculation to form'}
                          >
                            <RotateCcw size={14} />
                          </button>
                        )}

                        {/* Open in Drive */}
                        {file.webViewLink && (
                          <a
                            href={file.webViewLink}
                            target="_blank"
                            rel="noreferrer"
                            className="p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                            title={isBM ? 'Buka di Google Drive' : 'Open in Google Drive'}
                          >
                            <ExternalLink size={14} />
                          </a>
                        )}

                        {/* Delete button (triggers confirmation dialog) */}
                        <button
                          type="button"
                          onClick={() => setDeleteTarget(file)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                          title={isBM ? 'Padam fail' : 'Delete file'}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 text-xs font-bold rounded-xl transition-colors cursor-pointer"
          >
            {isBM ? 'Tutup' : 'Close'}
          </button>
        </div>
      </div>

      {/* Mandatory User Confirmation Dialog for Destructive Operations (File Deletion) */}
      {deleteTarget && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-900/70 animate-fadeIn" id="delete-confirm-dialog">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl border border-slate-200 text-slate-800">
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center">
                <Trash2 size={18} />
              </div>
              <h4 className="font-display font-bold text-sm text-slate-900">
                {isBM ? 'Sahkan Padam Fail?' : 'Confirm File Deletion?'}
              </h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              {isBM 
                ? `Adakah anda pasti mahu memadam fail "${deleteTarget.name}" daripada Google Drive anda? Tindakan ini tidak boleh diundur.` 
                : `Are you sure you want to permanently delete "${deleteTarget.name}" from your Google Drive? This action cannot be undone.`}
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                disabled={isDeleting}
                className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-lg transition-colors cursor-pointer"
              >
                {isBM ? 'Batal' : 'Cancel'}
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="px-3.5 py-1.5 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 cursor-pointer disabled:opacity-60"
              >
                {isDeleting && <Loader2 size={12} className="animate-spin" />}
                <span>{isBM ? 'Ya, Padam Fail' : 'Yes, Delete File'}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
