import Image from "next/image";

import { siteConfig } from "@/config/site";

export function HeroSection() {
  return (
    <header className="sticky top-0 z-40 border-b border-[#d6c77d]/40 bg-[#fcf9f3]/95 px-4 py-3 text-[#1c1c18] backdrop-blur">
      <div className="mx-auto flex max-w-4xl items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="relative h-11 w-11 overflow-hidden rounded-lg bg-soma-green">
            <Image
              src={siteConfig.logoPath}
              alt="SOMA logo"
              fill
              priority
              className="object-cover"
            />
          </div>
          <div>
            <p className="font-heading text-3xl font-black lowercase leading-none text-[#156e00]">
              soma
            </p>
            <p className="mt-0.5 text-[9px] font-extrabold uppercase tracking-[0.2em] text-[#5fbb46]">
              Sip Your Daily Ritual
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}
