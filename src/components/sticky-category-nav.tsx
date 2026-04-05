import { categoryMeta } from "@/config/site";
import type { MenuCategory } from "@/lib/types";

type StickyCategoryNavProps = {
  visibleCategories: MenuCategory[];
};

export function StickyCategoryNav({ visibleCategories }: StickyCategoryNavProps) {
  if (visibleCategories.length === 0) {
    return null;
  }

  return (
    <nav
      className="sticky top-0 z-30 mt-10 border-y border-soma-green/10 bg-[#fbf8f1]/85 backdrop-blur-xl"
      aria-label="Menu categories"
    >
      <div className="section-shell">
        <div className="flex gap-3 overflow-x-auto py-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visibleCategories.map((category) => (
            <a
              key={category}
              href={`#${category}`}
              className="inline-flex shrink-0 rounded-full border border-soma-green/10 bg-white/80 px-4 py-2 text-sm font-semibold text-soma-leaf shadow-sm transition hover:-translate-y-0.5 hover:bg-white"
            >
              {categoryMeta[category].label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
