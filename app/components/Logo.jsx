import React from "react";

/**
 * Hayzee Computer Resources (HCR) logo mark.
 * A white rounded badge with the "HCR" monogram — navy letters, orange accent.
 * Designed to sit on the navy navbar / footer. Scales crisply at any size.
 *
 * Usage: <Logo className="h-11 w-11" />  (square)
 *        <Logo className="h-10 w-10" wordmark />  (badge + text lockup)
 */
const Logo = ({ className = "h-11 w-11", wordmark = false }) => {
  const badge = (
    <svg
      viewBox="0 0 64 64"
      className={wordmark ? "h-full w-auto flex-shrink-0" : className}
      role="img"
      aria-label="Hayzee Computer Resources"
    >
      {/* Badge */}
      <rect x="2" y="2" width="60" height="60" rx="16" fill="#ffffff" />
      <rect
        x="2.75"
        y="2.75"
        width="58.5"
        height="58.5"
        rx="15.25"
        fill="none"
        stroke="#0E1B4D"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />

      {/* Creative "H" — two navy stems with a dynamic orange slanted crossbar */}
      <rect x="12.5" y="22.5" width="4.5" height="15" rx="2.25" fill="#0E1B4D" />
      <rect x="22" y="22.5" width="4.5" height="15" rx="2.25" fill="#0E1B4D" />
      <polygon points="17,32.2 22,28.8 22,31.8 17,35.2" fill="#FF7A1A" />

      {/* C R */}
      <text
        x="28"
        y="30"
        textAnchor="start"
        dominantBaseline="central"
        fontFamily="'Rubik', system-ui, -apple-system, sans-serif"
        fontWeight="800"
        fontSize="21"
        letterSpacing="-0.5"
        fill="#0E1B4D"
      >
        CR
      </text>

      {/* Accent underline */}
      <rect x="21" y="42" width="22" height="3.5" rx="1.75" fill="#FF7A1A" />
    </svg>
  );

  if (!wordmark) return badge;

  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      {badge}
      <span className="flex flex-col leading-none">
        <span className="text-base font-extrabold tracking-tight text-white">
          Hayzee
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.12em] text-accent-300">
          Computer Resources
        </span>
      </span>
    </span>
  );
};

export default Logo;
