import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  isDark?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'md', showSubtitle = true, className = '', isDark = false }) => {
  const iconDimensions = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
    xl: 'w-14 h-14 text-xl',
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg',
    lg: 'text-xl',
    xl: 'text-2xl',
  };

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Brand Icon Emblem */}
      <div
        className={`${iconDimensions[size]} relative rounded-2xl bg-gradient-to-tr from-indigo-500 via-sky-400 to-emerald-400 p-[2px] shadow-sm shadow-indigo-500/20 transition-transform duration-200 hover:scale-105 shrink-0`}
      >
        <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center relative overflow-hidden">
          {/* Subtle decorative gradient glow behind */}
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/60 via-sky-50/40 to-emerald-50/60" />

          {/* SVG Vector ∂ Symbol with Tangent Trajectory and Scholar Duck Cap */}
          <svg
            viewBox="0 0 40 40"
            className="w-4/5 h-4/5 relative z-10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#4F46E5" />
                <stop offset="50%" stopColor="#0EA5E9" />
                <stop offset="100%" stopColor="#10B981" />
              </linearGradient>
              <linearGradient id="beakGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="100%" stopColor="#F97316" />
              </linearGradient>
            </defs>

            {/* Smooth Tangent Curve Arc */}
            <path
              d="M 6 32 C 14 31, 22 22, 34 10"
              stroke="#E0E7FF"
              strokeWidth="2"
              strokeDasharray="2 2"
              strokeLinecap="round"
            />

            {/* Mathematical Derivative Partial ∂ */}
            <path
              d="M24 10 C20 10 16.5 13 15 17.5 C14 20 14 22 15 24.5 C12.5 22 8 23.5 8 28.5 C8 32.5 12 35 18 35 C25 35 28 29.5 28 21 C28 14.5 26 10 24 10 Z M17.5 31.5 C13.5 31.5 11.5 29.5 11.5 27.5 C11.5 25.5 14 24 16.5 25.5 C15.5 28 16 30 17.5 31.5 Z M21.5 23.5 C20 28 18 29.5 17 29.5 C16 27.5 16.5 23.5 17.5 20.5 C18.5 17.5 20.5 14 23 14 C24.5 14 25.5 16.5 25.5 19.5 C25.5 21.5 23.5 23.5 21.5 23.5 Z"
              fill="url(#logoGradient)"
            />

            {/* Cheerful Duck Scholar Accent in the upper corner */}
            <g transform="translate(24, 6) scale(0.68)">
              {/* Duck Head */}
              <circle cx="9" cy="9" r="6" fill="#FBBF24" />
              {/* Cute Beak */}
              <polygon points="14,8 19,10 14,12" fill="url(#beakGradient)" />
              {/* Sparkle Eye */}
              <circle cx="11" cy="7.5" r="1.3" fill="#1E293B" />
              <circle cx="11.4" cy="7.1" r="0.4" fill="#FFFFFF" />
              {/* Cute Blush Cheek */}
              <ellipse cx="9" cy="11" rx="1.6" ry="1" fill="#F472B6" opacity="0.6" />
              {/* Scholar Cap / Toga */}
              <polygon points="9,2 15,4.5 9,7 3,4.5" fill="#312E81" />
              <line x1="9" y1="4.5" x2="13.5" y2="7.5" stroke="#F59E0B" strokeWidth="0.8" />
            </g>
          </svg>
        </div>
      </div>

      {/* Brand Text */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center gap-1.5">
          <span className={`font-extrabold tracking-tight ${isDark ? 'text-white' : 'text-slate-800'} ${titleSizes[size]} font-['Outfit']`}>
            Turunan
            <span className="bg-gradient-to-r from-indigo-400 via-sky-400 to-teal-400 bg-clip-text text-transparent">
              Ku
            </span>
          </span>
        </div>
        {showSubtitle && (
          <span className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-400'} tracking-normal mt-0.5`}>
            Kalkulus Interaktif & Ceria
          </span>
        )}
      </div>
    </div>
  );
};
