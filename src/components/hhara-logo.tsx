export function HharaLogo({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <svg
        viewBox="0 0 32 32"
        fill="none"
        aria-hidden="true"
        className="h-7 w-7"
      >
        <path
          d="M16 2 L20 12 L30 14 L22 20 L24 30 L16 25 L8 30 L10 20 L2 14 L12 12 Z"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinejoin="round"
        />
        <circle cx="16" cy="16" r="2.5" fill="currentColor" />
      </svg>
      <span
        className="font-sans tracking-[0.22em] text-[22px] sm:text-[24px] leading-none"
        style={{ fontWeight: 500 }}
      >
        HHARA
      </span>
    </div>
  );
}
