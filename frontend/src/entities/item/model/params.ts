export type ItemParams =
  | AutoItemParams
  | RealEstateItemParams
  | ElectronicsItemParams;

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
};

export const AUTO_PARAMS_MAP: Record<keyof AutoItemParams, string> = {
  brand: "Бренд",
  model: "Модель",
  yearOfManufacture: "Год производства",
  transmission: "Трансмиссия",
  mileage: "Пробег",
  enginePower: "Мощность двигателя",
};

type RealEstateItemParams = {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
};

export const REAL_ESTATE_PARAMS_MAP: Record<
  keyof RealEstateItemParams,
  string
> = {
  type: "Тип",
  address: "Адрес",
  area: "Площадь",
  floor: "Этаж",
};

type ElectronicsItemParams = {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
};

export const ELECTRONICS_PARAMS_MAP: Record<
  keyof ElectronicsItemParams,
  string
> = {
  type: "Тип",
  brand: "Бренд",
  model: "Модель",
  condition: "Состояние",
  color: "Цвет",
};
