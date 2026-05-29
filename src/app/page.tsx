import { HharaLogo } from "@/components/hhara-logo";
import { EarlyAccessForm } from "@/components/early-access-form";
import { Marquee } from "@/components/marquee";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=2000&q=85";

export default function Page() {
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
        <div className="relative z-10 flex min-h-[calc(100vh-2.5rem)] w-full items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
          <div className="group grid w-full max-w-[980px] grid-cols-1 overflow-hidden bg-cream shadow-[0_20px_60px_-15px_rgba(58,36,22,0.45)] ring-1 ring-bark/5 transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_30px_80px_-10px_rgba(58,36,22,0.55)] md:grid-cols-2">
            {/* Left: text + form */}
            <div className="flex flex-col px-6 py-5 sm:px-8 sm:py-6">
              <div className="flex items-center justify-center mb-3">
                <HharaLogo className="h-8 w-auto" />
              </div>

              <p className="mb-1.5 flex items-baseline justify-center gap-1.5 text-gold">
                <span className="font-sans font-bold uppercase tracking-[0.20em] text-[10px]">
                  Unapologetically
                </span>
                <span className="font-serif font-light italic text-[17px] leading-none">
                  You.
                </span>
              </p>

              <h1 className="font-sans text-center">
                <span className="block font-light text-[28px] sm:text-[32px] leading-[1.05] tracking-[-0.01em] text-ink">
                  Unseen.
                </span>
                <span className="block font-light text-[28px] sm:text-[32px] leading-[1.05] tracking-[-0.01em] text-ink">
                  Undeniable.
                </span>
                <span className="block font-light italic text-[28px] sm:text-[32px] leading-[1.05] tracking-[-0.01em] text-gold">
                  Unstoppable.
                </span>
              </h1>

              <div className="mt-3 mx-auto h-px w-6 bg-gold" />

              <p className="mt-3 text-center font-sans text-[11.5px] tracking-[0.04em] leading-[1.75] text-warm">
                She moves before the world notices. She carries what others
                don&apos;t see. HHARA was made for her, without apology,
                without compromise.
              </p>

              <p className="mt-2 text-center font-serif font-light italic text-[13.5px] tracking-[0.02em] text-gold">
                Fashion with purpose. Every piece gives back.
              </p>

              {/* Form panel */}
              <div className="mt-5 bg-cream-2 px-6 py-5">
                <p className="font-sans font-semibold text-[9px] tracking-eyebrow uppercase text-ink">
                  Request Early Access
                </p>
                <div className="mt-2">
                  <EarlyAccessForm />
                </div>
              </div>

              {/* Gift callout */}
              <div className="mt-3 bg-gold-pale px-6 py-4">
                <p className="font-sans font-semibold text-[9px] tracking-eyebrow uppercase text-gold">
                  Something Unexpected Awaits
                </p>
                <p className="mt-2 font-serif font-light italic text-[13px] leading-[1.6] text-ink">
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
                <p className="font-serif font-light italic text-cream-off text-[17px] drop-shadow">
                  Proudly She.
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
