const items = [
  "Wonder, worn.",
  "Fashion with purpose",
  "Every piece gives back",
  "Sustainable luxury athleisure",
  "Made for the exceptional, intentional woman",
  "Global shipping",
  "She is Wonder",
  "Dahlia Moxie Trading L.L.C Company",
];

function Block({ ariaHidden = false }: { ariaHidden?: boolean }) {
  return (
    <div
      aria-hidden={ariaHidden || undefined}
      className="flex shrink-0 items-center"
    >
      {items.map((text, i) => (
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
  );
}

export function Marquee() {
  return (
    <div className="relative z-10 w-full bg-ticker py-3 overflow-hidden">
      <div className="flex w-max animate-marquee-fast md:animate-marquee will-change-transform">
        <Block />
        <Block ariaHidden />
      </div>
    </div>
  );
}
