import { AddonsSection } from "@/components/addons-section";
import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { MenuEmptyState } from "@/components/menu-empty-state";
import { MenuSection } from "@/components/menu-section";
import { MenuStatus } from "@/components/menu-status";
import { StickyCategoryNav } from "@/components/sticky-category-nav";
import { categoryMeta } from "@/config/site";
import { getMenuState, getVisibleMenu } from "@/lib/menu";
import type { MenuCategory } from "@/lib/types";

export default async function HomePage() {
  const menuState = await getMenuState();
  const groupedMenu = getVisibleMenu(menuState.items);
  const visibleCategories = (Object.keys(groupedMenu) as MenuCategory[]).filter(
    (category) => groupedMenu[category].length > 0
  );
  const hasVisibleItems = visibleCategories.length > 0;

  return (
    <main>
      <HeroSection />
      <div className="relative z-10 -mt-8 rounded-t-[2rem] bg-[#fbf8f1] pb-4 text-[#1f4022] shadow-[0_-24px_60px_rgba(18,63,25,0.18)] sm:-mt-10 sm:rounded-t-[2.5rem]">
        <MenuStatus source={menuState.source} error={menuState.error} />

        {hasVisibleItems ? (
          <>
            <StickyCategoryNav visibleCategories={visibleCategories} />

            <div id="menu" className="pt-4">
              <MenuSection
                id={categoryMeta.juices.id}
                eyebrow="Cold Pressed"
                title="Juices"
                description="Refreshing blends built around bright fruit, greens, and a clean finish."
                items={groupedMenu.juices}
              />
              <MenuSection
                id={categoryMeta.smoothies.id}
                eyebrow="Blended"
                title="Vegan Smoothies"
                description="Creamy, satisfying combinations for a fuller sip with plant-based ingredients."
                items={groupedMenu.smoothies}
              />
              <MenuSection
                id={categoryMeta.iceCream.id}
                eyebrow="Sweet Scoop"
                title="Vegan Ice Cream"
                description="Dairy-free treats with rich flavor, smooth texture, and zero fuss."
                items={groupedMenu.iceCream}
              />
              <AddonsSection items={groupedMenu.addOns} />
            </div>
          </>
        ) : (
          <MenuEmptyState error={menuState.error} />
        )}

        <Footer />
      </div>
    </main>
  );
}
