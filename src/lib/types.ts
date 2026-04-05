export type MenuCategory = "juices" | "smoothies" | "iceCream" | "addOns";

export type MenuItem = {
  id: string;
  category: MenuCategory;
  name: string;
  ingredients: string;
  benefits?: string;
  description?: string;
  price: number;
  availableToday: boolean;
  sortOrder: number;
  featured?: boolean;
};

export type MenuState = {
  items: MenuItem[];
  source: "google-sheets" | "starter";
  error?: string;
};
