import { AnimatedReveal } from "@/components/animated-reveal";
import { MenuCard } from "@/components/menu-card";
import { SectionHeading } from "@/components/section-heading";
import type { MenuItem } from "@/lib/types";

type MenuSectionProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  items: MenuItem[];
};

export function MenuSection({
  id,
  eyebrow,
  title,
  description,
  items
}: MenuSectionProps) {
  if (items.length === 0) {
    return null;
  }

  return (
    <section id={id} className="section-shell scroll-mt-24 py-8 sm:py-10">
      <AnimatedReveal>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          description={description}
        />
      </AnimatedReveal>
      <div className="menu-grid">
        {items.map((item, index) => (
          <AnimatedReveal key={item.id} delayMs={(index % 3) * 70}>
            <MenuCard item={item} />
          </AnimatedReveal>
        ))}
      </div>
    </section>
  );
}
