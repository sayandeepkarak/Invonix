export const INVENTORY_STEPS = {
  BASIC_INFO: "BASIC_INFO",
  PRICING_STOCK: "PRICING_STOCK",
  TAGS: "TAGS",
} as const;

export type InventoryStep = (typeof INVENTORY_STEPS)[keyof typeof INVENTORY_STEPS];

export const INVENTORY_CATEGORY = Object.freeze({
  ELECTRONICS: "Electronics",
  CLOTHING: "Clothing",
  FOOD_BEVERAGE: "Food & Beverage",
  HOME_GARDEN: "Home & Garden",
  SPORTS: "Sports",
  BEAUTY: "Beauty",
} as const);

export type InventoryCategory =
  (typeof INVENTORY_CATEGORY)[keyof typeof INVENTORY_CATEGORY];

export const INVENTORY_CATEGORY_OPTIONS = Object.values(INVENTORY_CATEGORY).map(
  (cat) => ({
    label: cat,
    value: cat,
  }),
);

export const DEFAULT_LOW_STOCK_THRESHOLD = 5;
export const PRODUCTS_PER_PAGE = 10;
