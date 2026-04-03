export type ItemParams = AutoItemParams | RealEstateItemParams | ElectronicsItemParams;

type AutoItemParams = {
  brand?: string;
  model?: string;
  yearOfManufacture?: number;
  transmission?: "automatic" | "manual";
  mileage?: number;
  enginePower?: number;
};

type RealEstateItemParams = {
  type?: "flat" | "house" | "room";
  address?: string;
  area?: number;
  floor?: number;
};

type ElectronicsItemParams = {
  type?: "phone" | "laptop" | "misc";
  brand?: string;
  model?: string;
  condition?: "new" | "used";
  color?: string;
};
