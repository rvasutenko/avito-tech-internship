export enum CATEGORY {
  AUTO = "auto",
  REAL_ESTATE = "real_estate",
  ELECTRONICS = "electronics",
}

export const CATEGORY_MAP: Record<CATEGORY, string> = {
  [CATEGORY.AUTO]: "Авто",
  [CATEGORY.REAL_ESTATE]: "Недвижимость",
  [CATEGORY.ELECTRONICS]: "Электроника",
};
