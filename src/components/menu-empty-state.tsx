import { CtaButton } from "@/components/cta-button";
import { siteConfig } from "@/config/site";

type MenuEmptyStateProps = {
  error?: string;
};

export function MenuEmptyState({ error }: MenuEmptyStateProps) {
  return (
    <section id="menu" className="section-shell py-12">
      <div className="card-surface rounded-[2rem] border border-white/80 px-5 py-10 text-center shadow-card sm:px-8">
        <p className="mb-3 inline-flex rounded-full bg-soma-green/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-soma-leaf">
          Menu unavailable
        </p>
        <h2 className="font-heading text-3xl font-bold text-soma-leaf">
          The menu is taking a quick breather
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
          {error ??
            "We could not load today's menu from Google Sheets right now. Please check back in a moment or message us directly."}
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <CtaButton href={siteConfig.whatsAppUrl} label="Message on WhatsApp" />
          <CtaButton
            href={siteConfig.instagramUrl}
            label="Visit Instagram"
            variant="secondary"
          />
        </div>
      </div>
    </section>
  );
}
