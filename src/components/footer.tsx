import { CtaButton } from "@/components/cta-button";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="section-shell py-12">
      <div className="rounded-[2rem] bg-soma-leaf px-5 py-8 text-white shadow-card sm:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="font-heading text-4xl font-bold uppercase tracking-[0.08em]">
              SOMA
            </p>
            <p className="mt-3 max-w-xl text-sm leading-6 text-white/80 sm:text-base">
              Daily menu updates live here. Scan the QR, browse what is available
              today, and message us if you want to reserve your favorite pour.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <CtaButton
              href={siteConfig.instagramUrl}
              label="Instagram"
              variant="secondary"
            />
            <CtaButton
              href={siteConfig.whatsAppUrl}
              label="WhatsApp"
              variant="secondary"
            />
          </div>
        </div>

        <div className="mt-8 grid gap-3 border-t border-white/15 pt-6 text-sm text-white/80 sm:grid-cols-3">
          <p>{siteConfig.locationText}</p>
          <p>{siteConfig.hoursText}</p>
          <p>Menu updates daily</p>
        </div>
      </div>
    </footer>
  );
}
