import { CATEGORY } from "./category";

export type ItemParams =
  | AutoItemParams
  | RealEstateItemParams
  | ElectronicsItemParams;

export const mapItemParamKey = (
  category: CATEGORY,
  key: keyof ItemParams
): string => {
  switch (category) {
    case CATEGORY.REAL_ESTATE:
      return REAL_ESTATE_PARAMS_MAP[key];
    case CATEGORY.AUTO:
      return AUTO_PARAMS_MAP[key];
    case CATEGORY.ELECTRONICS:
      return ELECTRONICS_PARAMS_MAP[key];
    default:
      return key;
  }
};

export const mapItemParamVal = (
  category: CATEGORY,
  key: keyof ItemParams,
  val: string | number
) => {
  switch (category) {
    case CATEGORY.REAL_ESTATE:
      if (key === "type") {
        return REAL_ESTATE_TYPE_MAP[val as REAL_ESTATE_TYPE];
      }
      return val;
    case CATEGORY.AUTO:
      if (key === "transmission") {
        return TRANSMISSION_MAP[val as TRANSMISSION];
      }
      return val;
    case CATEGORY.ELECTRONICS:
      if (key === "condition") {
        return ELECTRONICS_CONDITION_MAP[val as ELECTRONICS_CONDITION];
      } else if (key === "type") {
        return ELECTRONICS_TYPE_MAP[val as ELECTRONICS_TYPE];
      }
      return val;
    default:
      return val;
  }
};

export enum TRANSMISSION {
  AUTOMATIC = "automatic",
  MANUAL = "manual",
}

export const TRANSMISSION_MAP: Record<TRANSMISSION, string> = {
  [TRANSMISSION.AUTOMATIC]: "Автомат",
  [TRANSMISSION.MANUAL]: "Механическая",
};

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: TRANSMISSION;
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
  type?: REAL_ESTATE_TYPE;
  address?: string;
  area?: number;
  floor?: number;
};

enum REAL_ESTATE_TYPE {
  FLAT = "flat",
  HOUSE = "house",
  ROOM = "room",
}

export const REAL_ESTATE_TYPE_MAP: Record<REAL_ESTATE_TYPE, string> = {
  [REAL_ESTATE_TYPE.FLAT]: "Квартира",
  [REAL_ESTATE_TYPE.HOUSE]: "Дом",
  [REAL_ESTATE_TYPE.ROOM]: "Комната",
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
  type?: ELECTRONICS_TYPE;
  brand?: string;
  model?: string;
  condition?: ELECTRONICS_CONDITION;
  color?: string;
};

enum ELECTRONICS_CONDITION {
  NEW = "new",
  USED = "used",
}

export const ELECTRONICS_CONDITION_MAP: Record<ELECTRONICS_CONDITION, string> =
  {
    [ELECTRONICS_CONDITION.NEW]: "Новый",
    [ELECTRONICS_CONDITION.USED]: "Б/у",
  };

export enum ELECTRONICS_TYPE {
  PHONE = "phone",
  LAPTOP = "laptop",
  MISC = "misc",
}

export const ELECTRONICS_TYPE_MAP: Record<ELECTRONICS_TYPE, string> = {
  [ELECTRONICS_TYPE.PHONE]: "Телефон",
  [ELECTRONICS_TYPE.LAPTOP]: "Ноутбук",
  [ELECTRONICS_TYPE.MISC]: "Разное",
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

export const getItemParamsKeys = (category: CATEGORY) => {
  switch (category) {
    case CATEGORY.REAL_ESTATE:
      return Object.keys(REAL_ESTATE_PARAMS_MAP);
    case CATEGORY.AUTO:
      return Object.keys(AUTO_PARAMS_MAP);
    case CATEGORY.ELECTRONICS:
      return Object.keys(ELECTRONICS_PARAMS_MAP);
    default:
      return [];
  }
};
