import React, { useState } from 'react';
import { AuthSession } from '../lib/auth';
import { UserRound, LogOut, LoaderCircle } from 'lucide-react';
import { BrandTitle } from './BrandTitle';

interface NavbarProps {
  authSession?: AuthSession | null;
  onLogout?: () => Promise<void>;
}

export const Navbar: React.FC<NavbarProps> = ({ authSession, onLogout }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const handleLogout = async () => {
    if (!onLogout || isLoggingOut) return;
    setIsLoggingOut(true);
    try { await onLogout(); }
    finally { setIsLoggingOut(false); }
  };

  const isAdmin = authSession?.role === 'admin';
  const roleLabel = isAdmin ? '大會系統管理員' : '台上抽籤人員';

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-[0_4px_20px_-8px_rgba(30,64,175,0.18)]">
      <div className="h-1 bg-gradient-to-r from-blue-700 via-sky-500 to-rose-500" aria-hidden="true" />
      <div className="mx-auto flex min-h-[4.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:min-h-[4.75rem] sm:px-6 lg:px-8">
        <a href="/" className="flex min-w-0 items-center gap-3 rounded-lg sm:gap-4 focus-visible:outline-2 focus-visible:outline-blue-600" aria-label="返回學生查榜首頁">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-blue-100 bg-blue-50 p-1.5 shadow-sm sm:h-12 sm:w-12">
            <img
              src="https://cidsexhibition.nutc.edu.tw/images/logo.png"
              alt=""
              className="max-h-full max-w-full object-contain"
              loading="eager"
            />
          </div>
          <div className="hidden h-9 w-0.5 rounded-full bg-gradient-to-b from-blue-600 to-rose-500 sm:block" aria-hidden="true" />
          <BrandTitle />
        </a>

        {authSession && onLogout && (
          <details className="group relative shrink-0">
            <summary
              aria-label={`目前登入：${roleLabel}，開啟帳號選單`}
              className={`flex h-11 w-11 list-none items-center justify-center rounded-full border-2 shadow-sm transition-all hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 cursor-pointer [&::-webkit-details-marker]:hidden ${isAdmin ? 'border-emerald-200 bg-emerald-50 text-emerald-700 hover:border-emerald-300 hover:bg-emerald-100 group-open:border-emerald-400' : 'border-rose-200 bg-rose-50 text-rose-700 hover:border-rose-300 hover:bg-rose-100 group-open:border-rose-400'}`}
            >
              <UserRound className="h-5 w-5" strokeWidth={2.25} aria-hidden="true" />
            </summary>
            <div className="absolute right-0 top-full z-50 mt-3 w-[min(19rem,calc(100vw-2rem))] rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10">
              <div className="px-3 py-3">
                <p className="text-xs font-semibold text-slate-500">目前登入</p>
                <p className="mt-1 text-sm font-black text-slate-900">{roleLabel}</p>
                <p className="mt-1 break-all text-xs text-slate-600">{authSession.username}</p>
              </div>
              <div className="border-t border-slate-100 pt-2">
                <button
                  onClick={() => void handleLogout()}
                  disabled={isLoggingOut}
                  type="button"
                  className="flex min-h-11 w-full items-center gap-2.5 rounded-xl px-3 text-left text-sm font-bold text-rose-700 transition-colors hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-blue-600 disabled:cursor-wait disabled:opacity-50 cursor-pointer"
                >
                  {isLoggingOut ? <LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" aria-hidden="true" /> : <LogOut className="h-4 w-4" aria-hidden="true" />}
                  {isLoggingOut ? '登出中…' : isAdmin ? '登出後台' : '登出'}
                </button>
              </div>
            </div>
          </details>
        )}
      </div>
    </header>
  );
};
