"use client";

import { useState } from "react";

import {
  CompactMenuGroup,
  CompactMenuScreen
} from "@/components/compact-menu";
import type { MenuItem } from "@/lib/types";

type GroupedMenu = {
  juices: MenuItem[];
  smoothies: MenuItem[];
  milkshakes: MenuItem[];
  iceCream: MenuItem[];
  addOns: MenuItem[];
};

type MenuTabsProps = {
  groupedMenu: GroupedMenu;
};

type MenuTab = "juices" | "blends" | "iceCream";

const proteinScoop: MenuItem = {
  id: "addon-protein-scoop-fixed",
  category: "addOns",
  name: "Protein Scoop",
  ingredients: "30gm protein",
  price: 80,
  availableToday: true,
  sortOrder: 999
};

function getAddOns(items: MenuItem[]) {
  const hasProteinScoop = items.some((item) =>
    item.name.toLowerCase().includes("protein")
  );

  return hasProteinScoop ? items : [...items, proteinScoop];
}

function splitMenuItems(items: MenuItem[]) {
  const midpoint = Math.ceil(items.length / 2);
  return [items.slice(0, midpoint), items.slice(midpoint)];
}

export function MenuTabs({ groupedMenu }: MenuTabsProps) {
  const [activeTab, setActiveTab] = useState<MenuTab>(() => {
    if (groupedMenu.juices.length > 0) return "juices";
    if (groupedMenu.smoothies.length > 0 || groupedMenu.milkshakes.length > 0) {
      return "blends";
    }
    if (groupedMenu.addOns.length > 0) return "blends";
    return "iceCream";
  });
  const addOns = getAddOns(groupedMenu.addOns);
  const [primaryJuices, secondaryJuices] = splitMenuItems(groupedMenu.juices);

  return (
    <div className="bg-[#fcf9f3]">
      <div className="sticky top-[4.25rem] z-30 border-b border-[#d6c77d]/40 bg-[#fcf9f3]/95 px-4 py-3 backdrop-blur">
        <div
          className="mx-auto grid max-w-4xl grid-cols-3 overflow-hidden rounded-lg border border-[#bfcab6]/70 bg-white text-[10px] font-extrabold uppercase tracking-[0.08em] text-[#2c6b2c]"
          role="tablist"
          aria-label="Menu categories"
        >
          {(["juices", "blends", "iceCream"] as MenuTab[]).map((tab) => (
            <button
              key={tab}
              type="button"
              role="tab"
              aria-selected={activeTab === tab}
              className={`min-h-11 px-2 py-2 leading-4 transition ${
                activeTab === tab
                  ? "bg-[#5ebc44] text-white"
                  : "bg-white text-[#2c6b2c]"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "juices" ? "Juices" : null}
              {tab === "blends" ? (
                <>
                  Smoothies
                  <br />
                  Milkshakes
                </>
              ) : null}
              {tab === "iceCream" ? "Ice Cream" : null}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "juices" ? (
        <CompactMenuScreen
          id="juices"
          eyebrow="SOMA"
          title="Cold Pressed Juices"
          subtitle="Plant-Based No Sugar No Water"
          sideLabel="Drink Clean. Feel Alive."
        >
          <CompactMenuGroup
            title="Juices"
            measure="300 ml"
            items={primaryJuices}
          />
          <CompactMenuGroup
            title="More Juices"
            measure="300 ml"
            items={secondaryJuices}
          />
        </CompactMenuScreen>
      ) : null}

      {activeTab === "blends" ? (
        <CompactMenuScreen
          id="smoothies-milkshakes"
          eyebrow="SOMA"
          title="Smoothies & Milkshakes"
          subtitle="Creamy Chilled Blends"
          sideLabel="Plant Based. Made Daily."
        >
          <CompactMenuGroup
            title="Smoothies"
            measure="300 ml"
            items={groupedMenu.smoothies}
          />
          <CompactMenuGroup
            title="Milkshakes"
            measure="300 ml"
            items={groupedMenu.milkshakes}
          />
          <CompactMenuGroup title="Add-on" items={addOns} />
        </CompactMenuScreen>
      ) : null}

      {activeTab === "iceCream" ? (
        <CompactMenuScreen
          id="iceCream"
          eyebrow="SOMA"
          title="Vegan Ice Creams"
          subtitle="125 ml Plant-Based Scoops"
          sideLabel="No Sugar. No Water."
        >
          <CompactMenuGroup
            title="Ice Creams"
            measure="125 ml"
            items={groupedMenu.iceCream}
          />
        </CompactMenuScreen>
      ) : null}
    </div>
  );
}
