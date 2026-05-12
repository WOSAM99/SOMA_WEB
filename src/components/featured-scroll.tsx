"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import { formatCurrency } from "@/lib/menu";
import type { MenuItem } from "@/lib/types";

type FeaturedScrollProps = {
  items: MenuItem[];
};

export function FeaturedScroll({ items }: FeaturedScrollProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [progress, setProgress] = useState(0);

  const slides = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        tone:
          index % 3 === 0
            ? "from-soma-green to-soma-lime text-white"
            : index % 3 === 1
              ? "from-soma-mango to-[#ffd87c] text-[#5b3b11]"
              : "from-[#f8e8cc] to-white text-[#5d482d]"
      })),
    [items]
  );

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const onScroll = () => {
      const rect = node.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }

      const nextProgress = Math.min(Math.max(-rect.top / total, 0), 1);
      setProgress(nextProgress);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  if (slides.length === 0) {
    return null;
  }

  const translate = progress * Math.max(0, (slides.length - 1) * 72);

  return (
    <section
      ref={sectionRef}
      className="section-shell relative mt-10 h-[220vh] sm:mt-14"
      aria-labelledby="featured-title"
    >
      <div className="sticky top-16 overflow-hidden rounded-[2rem] bg-[#f4efdf] px-4 py-6 shadow-card sm:top-20 sm:px-6 sm:py-8">
        <div className="mb-5 flex items-end justify-between gap-3">
          <div>
            <p className="mb-2 inline-flex rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-soma-leaf">
              Featured Pour
            </p>
            <h2
              id="featured-title"
              className="font-heading text-3xl font-bold text-soma-leaf sm:text-4xl"
            >
              Today at SOMA
            </h2>
          </div>
          <p className="max-w-[12rem] text-right text-sm text-slate-500">
            Scroll down and let the highlights glide across.
          </p>
        </div>

        <div className="overflow-hidden">
          <div
            className="flex gap-4 will-change-transform transition-transform duration-100 ease-out sm:gap-6"
            style={{
              transform: `translateX(calc(-${translate}% + ${progress * 1.2}rem))`
            }}
          >
            {slides.map((item) => (
              <article
                key={item.id}
                className={`min-h-[24rem] min-w-[84%] rounded-[2rem] bg-gradient-to-br p-5 shadow-soft sm:min-w-[42%] lg:min-w-[32%] ${item.tone}`}
              >
                <div className="flex h-full flex-col justify-between">
                  <div>
                    <div className="mb-10 inline-flex rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]">
                      {item.category === "iceCream"
                        ? "Sweet Ritual"
                        : item.category === "smoothies"
                          ? "Blend Highlight"
                          : "Fresh Pour"}
                    </div>
                    <h3 className="font-heading text-4xl font-bold leading-none">
                      {item.name}
                    </h3>
                    <p className="mt-4 text-sm leading-6 opacity-90">
                      {item.ingredients}
                    </p>
                    {typeof item.kcal === "number" ? (
                      <p className="mt-4 inline-flex rounded-full bg-white/20 px-3 py-1 text-sm font-bold">
                        {item.kcal} kcal
                      </p>
                    ) : null}
                    {item.benefits ?? item.nutritionInfo ? (
                      <p className="mt-4 text-base font-medium opacity-95">
                        {item.benefits ?? item.nutritionInfo}
                      </p>
                    ) : null}
                    {item.description ? (
                      <p className="mt-4 text-base font-medium opacity-95">
                        {item.description}
                      </p>
                    ) : null}
                  </div>

                  <div className="mt-8 flex items-center justify-between">
                    <div className="rounded-full bg-white/20 px-4 py-2 text-sm font-semibold">
                      Available today
                    </div>
                    <p className="font-heading text-3xl font-bold">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
