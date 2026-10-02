import React from 'react';

interface BrandTitleProps {
  compact?: boolean;
}

export const BrandTitle: React.FC<BrandTitleProps> = ({ compact = false }) => (
  <div className="min-w-0">
    <p className={`truncate font-bold text-blue-700 ${compact ? 'text-[10px] tracking-wide' : 'text-[10px] tracking-[0.06em] sm:text-xs'}`}>
      國立臺中科技大學 · 資訊與流通學院
    </p>
    <div className={`flex min-w-0 items-center ${compact ? 'mt-0.5 gap-1.5' : 'mt-1 gap-2 sm:gap-2.5'}`}>
      <p className={`shrink-0 font-black leading-none tracking-tight text-slate-900 ${compact ? 'text-sm' : 'text-lg sm:text-2xl'}`}>專題成果展</p>
      <span className={`shrink-0 rounded-full border border-blue-200 bg-blue-50 font-bold leading-none text-blue-800 ${compact ? 'px-2 py-1 text-[10px]' : 'px-2 py-1 text-[10px] sm:px-2.5 sm:py-1.5 sm:text-xs'}`}>
        報告抽籤系統
      </span>
    </div>
  </div>
);
