import React from 'react';

export interface MeowneyLogoProps {
  /** Size of the logo (sm: 24px, md: 32px, lg: 48px, xl: 64px, or custom number in px) */
  size?: 'sm' | 'md' | 'lg' | 'xl' | number;
  /** Color theme variant of the logo */
  variant?: 'default' | 'dark' | 'light' | 'sakura';
  /** Whether to show the "Meowney" text wordmark */
  showWordmark?: boolean;
  /** Extra CSS classes for the container */
  className?: string;
  /** Extra CSS classes for the wordmark text */
  wordmarkClassName?: string;
  /** Extra CSS classes for the cat icon */
  iconClassName?: string;
}

export function MeowneyLogo({
  size = 'md',
  variant = 'default',
  showWordmark = true,
  className = '',
  wordmarkClassName = '',
  iconClassName = '',
}: MeowneyLogoProps) {
  // Determine pixel size for icon and font size class for wordmark
  let iconPx = 32;
  let textSizeClass = 'text-2xl';

  if (typeof size === 'number') {
    iconPx = size;
    if (size <= 24) textSizeClass = 'text-lg';
    else if (size <= 36) textSizeClass = 'text-2xl';
    else if (size <= 52) textSizeClass = 'text-3xl';
    else textSizeClass = 'text-4xl';
  } else {
    switch (size) {
      case 'sm':
        iconPx = 24;
        textSizeClass = 'text-lg';
        break;
      case 'md':
        iconPx = 32;
        textSizeClass = 'text-2xl';
        break;
      case 'lg':
        iconPx = 48;
        textSizeClass = 'text-3xl';
        break;
      case 'xl':
        iconPx = 64;
        textSizeClass = 'text-4xl';
        break;
    }
  }

  // Variant color mapping
  let wordmarkColor = 'text-[#2B2B2B]';
  let catFill = '#FFB7C5'; // Sakura pink
  let catEarInner = '#FFFDD0'; // Cream
  let outlineColor = '#2B2B2B'; // Soft Charcoal

  if (variant === 'light') {
    wordmarkColor = 'text-[#FFFDD0]';
    catFill = '#FFB7C5';
    catEarInner = '#2B2B2B';
    outlineColor = '#FFFDD0';
  } else if (variant === 'sakura') {
    wordmarkColor = 'text-[#FFB7C5]';
    catFill = '#FFFDD0';
    catEarInner = '#FFB7C5';
    outlineColor = '#2B2B2B';
  } else if (variant === 'dark') {
    wordmarkColor = 'text-[#2B2B2B]';
    catFill = '#2B2B2B';
    catEarInner = '#FFB7C5';
    outlineColor = '#FFFDD0';
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 select-none ${className}`}
      data-testid="meowney-logo"
    >
      {/* Kawaii Cat Icon (Stitch 1:1 Icon) */}
      <svg
        width={iconPx}
        height={iconPx}
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`transition-transform duration-200 hover:scale-105 ${iconClassName}`}
        aria-label="Meowney Kawaii Cat Logo"
        role="img"
      >
        {/* Cat Head Base */}
        <path
          d="M12 24 C10 12, 22 8, 26 14 C32 10, 32 10, 38 14 C42 8, 54 12, 52 24 C58 36, 52 54, 32 54 C12 54, 6 36, 12 24 Z"
          fill={catFill}
          stroke={outlineColor}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Left Ear Inner */}
        <path
          d="M16 20 C15 14, 20 12, 23 16 Z"
          fill={catEarInner}
          stroke={outlineColor}
          strokeWidth="2"
        />

        {/* Right Ear Inner */}
        <path
          d="M48 20 C49 14, 44 12, 41 16 Z"
          fill={catEarInner}
          stroke={outlineColor}
          strokeWidth="2"
        />

        {/* Kawaii Eye Left */}
        <circle cx="23" cy="30" r="3.5" fill={outlineColor} />
        <circle cx="24.5" cy="28.5" r="1.2" fill="#FFFFFF" />

        {/* Kawaii Eye Right */}
        <circle cx="41" cy="30" r="3.5" fill={outlineColor} />
        <circle cx="42.5" cy="28.5" r="1.2" fill="#FFFFFF" />

        {/* Kawaii Rosy Cheeks */}
        <ellipse cx="18" cy="34" rx="3" ry="1.8" fill="#FF8DA1" opacity="0.75" />
        <ellipse cx="46" cy="34" rx="3" ry="1.8" fill="#FF8DA1" opacity="0.75" />

        {/* Cute Nose */}
        <polygon points="32,32 30,35 34,35" fill={outlineColor} />

        {/* W-Smile */}
        <path
          d="M28 37 Q30 40 32 37 Q34 40 36 37"
          stroke={outlineColor}
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />

        {/* Left Whiskers */}
        <path d="M8 30 L16 32" stroke={outlineColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M7 36 L15 36" stroke={outlineColor} strokeWidth="2" strokeLinecap="round" />

        {/* Right Whiskers */}
        <path d="M56 30 L48 32" stroke={outlineColor} strokeWidth="2" strokeLinecap="round" />
        <path d="M57 36 L49 36" stroke={outlineColor} strokeWidth="2" strokeLinecap="round" />

        {/* Money Collar Coin / Bell */}
        <circle cx="32" cy="50" r="4.5" fill="#FFFDD0" stroke={outlineColor} strokeWidth="2" />
        <circle cx="32" cy="50" r="1.8" fill="#A3E4D7" />
      </svg>

      {/* Wordmark */}
      {showWordmark && (
        <span
          className={`font-heading font-extrabold tracking-tight ${textSizeClass} ${wordmarkColor} ${wordmarkClassName}`}
        >
          Meowney
        </span>
      )}
    </div>
  );
}

export default MeowneyLogo;
