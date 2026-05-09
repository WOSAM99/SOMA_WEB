import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-[#fcf9f3] px-4 pb-6 pt-3 text-[#2c6b2c]">
      <div className="mx-auto max-w-4xl border-t border-[#d6c77d]/50 pt-4">
        <p className="text-center text-[10px] font-bold uppercase tracking-[0.16em]">
          Menu updates daily
        </p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <a
            href={siteConfig.whatsAppUrl}
            className="flex min-h-12 items-center justify-center rounded-lg bg-[#5ebc44] px-4 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-white shadow-soft"
          >
            WhatsApp
          </a>
          <a
            href={siteConfig.instagramUrl}
            className="flex min-h-12 items-center justify-center rounded-lg border border-[#5ebc44]/30 bg-white px-4 py-3 text-sm font-extrabold uppercase tracking-[0.08em] text-[#2c6b2c] shadow-soft"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
}
