import { AnimatedReveal } from "@/components/animated-reveal";
import { SectionHeading } from "@/components/section-heading";
import { formatCurrency } from "@/lib/menu";
import type { MenuItem } from "@/lib/types";

type AddonsSectionProps = {
  items: MenuItem[];
};

export function AddonsSection({ items }: AddonsSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id="addOns" className="section-shell scroll-mt-24 py-8 sm:py-10">
      <AnimatedReveal>
        <SectionHeading
          eyebrow="Customize"
          title="Add-ons"
          description="Simple extras that make each order feel a little more yours."
        />
      </AnimatedReveal>

      <div className="grid gap-3">
        {items.map((item, index) => (
          <AnimatedReveal key={item.id} delayMs={index * 60}>
            <article className="card-surface flex items-center justify-between rounded-[1.4rem] border border-white/70 px-4 py-4 shadow-soft">
              <div>
                <h3 className="font-heading text-xl font-bold text-slate-900">
                  {item.name}
                </h3>
                <p className="text-sm text-slate-500">{item.ingredients}</p>
              </div>
              <p className="font-heading text-2xl font-bold text-soma-leaf">
                {formatCurrency(item.price)}
              </p>
            </article>
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
