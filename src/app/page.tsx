"use client";

import { useEffect, useRef } from "react";
import { HharaLogo } from "@/components/hhara-logo";
import { EarlyAccessForm } from "@/components/early-access-form";
import { Marquee } from "@/components/marquee";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000&q=85";

export default function Page() {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    // Mouse parallax: card drifts a few px toward the cursor.
    const MAX = 10; // px, max drift on each axis
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let raf = 0;

    const tick = () => {
      // ease toward target
      curX += (targetX - curX) * 0.08;
      curY += (targetY - curY) * 0.08;
      el.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(2)}px, 0)`;
      if (Math.abs(targetX - curX) > 0.05 || Math.abs(targetY - curY) > 0.05) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const onMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      // -1..1 relative to viewport center
      const nx = (e.clientX / w) * 2 - 1;
      const ny = (e.clientY / h) * 2 - 1;
      targetX = nx * MAX;
      targetY = ny * MAX;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onLeave = () => {
      targetX = 0;
      targetY = 0;
      if (!raf) raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseout", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-cream">
      {/* Hero */}
      <section className="relative flex-1 w-full">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-bark/55 via-ink/35 to-bark/55"
        />

        {/* Card */}
        <div className="relative z-10 flex min-h-[calc(100vh-2.5rem)] w-full items-center justify-center px-4 sm:px-6 pt-[20px] pb-[10px]">
          <div
            ref={cardRef}
            className="group grid w-full max-w-[760px] grid-cols-1 overflow-hidden bg-cream shadow-[0_20px_60px_-15px_rgba(58,36,22,0.45)] ring-1 ring-bark/5 transition-shadow duration-500 ease-out will-change-transform hover:shadow-[0_30px_80px_-10px_rgba(58,36,22,0.55)] md:grid-cols-2"
          >
            {/* Left: text + form */}
            <div className="flex flex-col px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center justify-center mb-3">
                <HharaLogo className="h-12 w-auto" />
              </div>

              <p className="flex items-center gap-2 text-gold">
                <span aria-hidden="true" className="inline-block h-px w-5 bg-gold" />
                <span className="font-sans font-semibold uppercase tracking-[0.32em] text-[10px]">
                  Early Access
                </span>
              </p>

              <p className="mt-2 mb-1 flex items-baseline gap-2 text-gold">
                <span className="font-sans font-bold uppercase tracking-[0.20em] text-[15px]">
                  Unapologetically
                </span>
                <span className="font-serif font-light italic text-[30px] leading-none">
                  You.
                </span>
              </p>

              <h1 className="font-serif text-left">
                <span className="block font-bold text-[30px] sm:text-[32px] leading-[1.02] tracking-[-0.01em] text-bark">
                  Unseen.
                </span>
                <span className="block font-bold text-[30px] sm:text-[32px] leading-[1.02] tracking-[-0.01em] text-bark">
                  Undeniable.
                </span>
                <span className="block font-bold italic text-[30px] sm:text-[32px] leading-[1.02] tracking-[-0.01em] text-gold">
                  Unstoppable.
                </span>
              </h1>

              <div className="mt-2 h-px w-6 bg-gold" />

              <p className="mt-2 text-left font-sans text-[11.5px] tracking-[0.04em] leading-[1.6] text-warm">
                She moves before the world notices. She carries what others
                don&apos;t see. HHARA was made for her, without apology,
                without compromise.
              </p>

              <p className="mt-1.5 text-left font-serif font-light italic text-[13px] tracking-[0.02em] text-gold">
                Fashion with purpose. Every piece gives back.
              </p>

              {/* Form panel */}
              <div className="mt-4 bg-cream-2 px-5 py-4">
                <p className="font-sans font-semibold text-[9px] tracking-eyebrow uppercase text-ink">
                  Request Early Access
                </p>
                <div className="mt-2.5">
                  <EarlyAccessForm />
                </div>
              </div>

              {/* Gift callout */}
              <div className="mt-2.5 bg-gold-pale px-5 py-3">
                <p className="font-sans font-semibold text-[9px] tracking-eyebrow uppercase text-gold">
                  Something Unexpected Awaits
                </p>
                <p className="mt-1.5 font-serif font-light italic text-[13px] leading-[1.55] text-ink">
                  The first 100 orders receive an unexpected gift, a small
                  wonder, chosen with intention.
                </p>
              </div>
            </div>

            {/* Right: same hero image */}
            <div className="relative hidden overflow-hidden bg-cream-3 md:block">
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-[cubic-bezier(.25,.46,.45,.94)] group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-bark/30 via-transparent to-transparent"
              />
              <div className="absolute bottom-5 right-5">
                <p className="font-sans font-bold uppercase tracking-[0.32em] text-cream-off text-[12px] drop-shadow">
                  Coming Soon
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee ticker — always visible, fixed-height bar */}
      <Marquee />
    </main>
  );
}
