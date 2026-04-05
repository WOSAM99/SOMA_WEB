import type { MenuItem } from "@/lib/types";

export const starterMenuItems: MenuItem[] = [
  {
    id: "juice-green-glow",
    category: "juices",
    name: "Green Glow",
    ingredients: "Apple, cucumber, spinach, lemon, ginger",
    benefits: "Refreshing, hydrating, rich in greens",
    price: 6.5,
    availableToday: true,
    sortOrder: 1,
    featured: true
  },
  {
    id: "juice-sunrise-root",
    category: "juices",
    name: "Sunrise Root",
    ingredients: "Carrot, orange, beetroot, ginger",
    benefits: "Energizing, vibrant, naturally sweet",
    price: 6.75,
    availableToday: true,
    sortOrder: 2
  },
  {
    id: "juice-citrus-cleanse",
    category: "juices",
    name: "Citrus Cleanse",
    ingredients: "Pineapple, orange, lemon, mint",
    benefits: "Bright, refreshing, immunity-supportive",
    price: 6.25,
    availableToday: false,
    sortOrder: 3
  },
  {
    id: "smoothie-banana-boost",
    category: "smoothies",
    name: "Banana Boost",
    ingredients: "Banana, oat milk, dates, cinnamon",
    benefits: "Creamy, filling, naturally energizing",
    price: 7.5,
    availableToday: true,
    sortOrder: 1,
    featured: true
  },
  {
    id: "smoothie-berry-plant-power",
    category: "smoothies",
    name: "Berry Plant Power",
    ingredients: "Mixed berries, almond milk, chia seeds",
    benefits: "Fruity, antioxidant-rich, satisfying",
    price: 7.95,
    availableToday: true,
    sortOrder: 2
  },
  {
    id: "smoothie-green-cream",
    category: "smoothies",
    name: "Green Cream",
    ingredients: "Spinach, banana, coconut milk, honey",
    benefits: "Smooth, refreshing, easy on digestion",
    price: 7.5,
    availableToday: true,
    sortOrder: 3
  },
  {
    id: "icecream-coconut-vanilla",
    category: "iceCream",
    name: "Coconut Vanilla",
    ingredients: "Coconut milk, vanilla bean, maple syrup",
    description: "Creamy, smooth, light tropical sweetness",
    price: 5.5,
    availableToday: true,
    sortOrder: 1,
    featured: true
  },
  {
    id: "icecream-chocolate-bliss",
    category: "iceCream",
    name: "Chocolate Bliss",
    ingredients: "Coconut milk, cocoa, dates",
    description: "Rich, indulgent, dairy-free",
    price: 5.5,
    availableToday: true,
    sortOrder: 2
  },
  {
    id: "addon-oat-milk",
    category: "addOns",
    name: "Oat Milk",
    ingredients: "Plant-based add-on",
    price: 0.5,
    availableToday: true,
    sortOrder: 1
  },
  {
    id: "addon-coconut-milk",
    category: "addOns",
    name: "Coconut Milk",
    ingredients: "Plant-based add-on",
    price: 0.5,
    availableToday: true,
    sortOrder: 2
  },
  {
    id: "addon-almond-milk",
    category: "addOns",
    name: "Almond Milk",
    ingredients: "Plant-based add-on",
    price: 0.5,
    availableToday: true,
    sortOrder: 3
  },
  {
    id: "addon-protein-scoop",
    category: "addOns",
    name: "Protein Scoop",
    ingredients: "Boost add-on",
    price: 1,
    availableToday: true,
    sortOrder: 4
  }
];
