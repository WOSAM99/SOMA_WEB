import Image from "next/image";

import { AnimatedReveal } from "@/components/animated-reveal";
import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-screen overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={siteConfig.logoPath}
          alt="SOMA logo background"
          fill
          priority
          className="object-cover object-center opacity-[0.16] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(94,188,68,0.72),rgba(94,188,68,0.92))]" />
      </div>

      <div className="section-shell relative z-10 flex min-h-screen items-end py-10 sm:py-14">
        <AnimatedReveal className="w-full">
          <div className="max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white/90 backdrop-blur-sm">
              <span className="leaf-dot bg-white/90" />
              Cold Pressed. Plant Based. Made Daily.
            </div>

            <p className="font-heading text-5xl font-extrabold uppercase tracking-[0.08em] text-white sm:text-7xl">
              {siteConfig.brandName}
            </p>
            <h1 className="mt-4 max-w-2xl font-heading text-4xl font-bold leading-[0.95] text-white sm:text-6xl">
              {siteConfig.tagline}
            </h1>
            <p className="mt-5 max-w-2xl text-balance text-base leading-7 text-white/88 sm:text-xl sm:leading-8">
              Fresh juices, vegan smoothies, and dairy-free ice cream for a
              colorful, satisfying daily ritual.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Juices
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Smoothies
              </span>
              <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold text-white backdrop-blur-sm">
                Ice Cream
              </span>
            </div>
          </div>
        </AnimatedReveal>
      </div>
    </section>
  );
}
