import { Footer } from "@/components/footer";
import { HeroSection } from "@/components/hero-section";
import { MenuTabs } from "@/components/menu-tabs";
import { MenuEmptyState } from "@/components/menu-empty-state";
import { MenuStatus } from "@/components/menu-status";
import { getMenuState, getVisibleMenu } from "@/lib/menu";

export default async function HomePage() {
  const menuState = await getMenuState();
  const groupedMenu = getVisibleMenu(menuState.items);
  const hasJuices = groupedMenu.juices.length > 0;
  const hasBlends =
    groupedMenu.smoothies.length > 0 || groupedMenu.milkshakes.length > 0;
  const hasIceCream = groupedMenu.iceCream.length > 0;
  const hasVisibleItems =
    hasJuices ||
    hasBlends ||
    hasIceCream ||
    groupedMenu.addOns.length > 0;
  const shouldShowStatus = menuState.source === "starter" || Boolean(menuState.error);

  return (
    <main className="bg-[#fcf9f3]">
      <HeroSection />

      {shouldShowStatus ? (
        <div className="bg-[#fcf9f3]">
          <MenuStatus source={menuState.source} error={menuState.error} />
        </div>
      ) : null}

      {hasVisibleItems ? (
        <MenuTabs groupedMenu={groupedMenu} />
      ) : (
        <MenuEmptyState error={menuState.error} />
      )}

      <Footer />
    </main>
  );
}
