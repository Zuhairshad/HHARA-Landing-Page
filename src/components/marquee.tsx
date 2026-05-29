const items = [
  "Wonder, worn.",
  "Fashion with purpose",
  "Every piece gives back",
  "Sustainable luxury athleisure",
  "Made for the exceptional, intentional woman",
  "Proudly She",
];

export function Marquee() {
  // Duplicate the list for a seamless loop (translateX -50%).
  const loop = [...items, ...items];

  return (
    <div className="relative z-10 w-full bg-ticker py-3 overflow-hidden">
      <div className="flex whitespace-nowrap animate-marquee will-change-transform">
        {loop.map((text, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-[7.5px] uppercase font-normal tracking-ticker text-cream-off/40"
          >
            {text}
            <span
              aria-hidden="true"
              className="text-gold/35 text-[8px] leading-none"
            >
              ◆
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
