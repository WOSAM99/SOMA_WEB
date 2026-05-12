import { formatCurrency } from "@/lib/menu";
import type { MenuItem } from "@/lib/types";

type CompactMenuScreenProps = {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  sideLabel: string;
};

type CompactMenuGroupProps = {
  title?: string;
  measure?: string;
  items: MenuItem[];
};

function getMenuNote(item: MenuItem) {
  return item.benefits ?? item.nutritionInfo ?? item.description;
}

export function CompactMenuScreen({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  sideLabel
}: CompactMenuScreenProps) {
  return (
    <section
      id={id}
      className="relative min-h-[calc(100svh-3.25rem)] scroll-mt-14 overflow-hidden bg-[#fcf9f3] px-4 py-5 text-[#1c1c18]"
    >
      <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-8 bg-[#7bb87b] sm:block">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rotate-90 whitespace-nowrap text-[9px] font-bold uppercase tracking-[0.2em] text-white/80">
          {sideLabel}
        </div>
      </div>

      <div className="mx-auto flex h-full max-w-4xl flex-col sm:pr-10">
        <header className="mb-4 border-b border-[#d6c77d]/50 pb-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#5fbb46]">
            {eyebrow}
          </p>
          <div className="mt-1 flex items-end justify-between gap-4">
            <h2 className="font-heading text-3xl font-black leading-none text-[#156e00]">
              {title}
            </h2>
            <p className="max-w-[9rem] text-right text-[10px] font-bold uppercase leading-4 tracking-[0.1em] text-[#2c6b2c]/70">
              {subtitle}
            </p>
          </div>
        </header>

        <div className="grid flex-1 content-start gap-x-6 gap-y-5 sm:grid-cols-2">
          {children}
        </div>
      </div>
    </section>
  );
}

export function CompactMenuGroup({
  title,
  measure,
  items
}: CompactMenuGroupProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <div className="min-w-0">
      {title ? (
        <div className="mb-2 flex items-center justify-between gap-3 border-b border-[#bfcab6]/50 pb-1">
          <h3 className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-[#404a3a]">
            {title}
          </h3>
          {measure ? (
            <span className="text-[10px] font-semibold italic text-[#404a3a]/60">
              {measure}
            </span>
          ) : null}
        </div>
      ) : null}

      <div className="space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className="min-w-0 border-l-2 border-[#8ac174]/60 pl-3"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
              <h4 className="min-w-0 break-words text-[15px] font-extrabold leading-tight text-[#1c1c18]">
                {item.name}
              </h4>
              <p className="shrink-0 text-sm font-extrabold text-[#2c6b2c]">
                {formatCurrency(item.price)}
              </p>
            </div>
            {item.ingredients || typeof item.kcal === "number" ? (
              <p className="mt-0.5 text-[11px] italic leading-4 text-[#2c6b2c]">
                {item.ingredients}
                {item.ingredients && typeof item.kcal === "number" ? (
                  <span className="mx-1.5 text-[#7e8a78]">/</span>
                ) : null}
                {typeof item.kcal === "number" ? (
                  <span className="not-italic font-bold text-[#6f7d68]">
                    {item.kcal} kcal
                  </span>
                ) : null}
              </p>
            ) : null}
            {getMenuNote(item) ? (
              <p className="mt-1 text-[10.5px] font-semibold leading-4 text-[#5c6656]">
                {getMenuNote(item)}
              </p>
            ) : null}
          </article>
        ))}
      </div>
    </div>
  );
}
