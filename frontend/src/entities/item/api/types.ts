import type { CATEGORY } from "../model/category";
import type { ItemParams } from "../model/types";

export type SortColumn = "title" | "createdAt";
export type SortDirection = "asc" | "desc";

export type ItemsGetIn = {
  q?: string;
  limit?: number;
  skip?: number;
  needsRevision?: boolean;
  categories?: string;
  sortColumn?: SortColumn;
  sortDirection?: SortDirection;
};

export type ItemsGetOut = {
  items: {
    category: CATEGORY;
    title: string;
    price: number;
    needsRevision: boolean;
  }[];
  total: number;
};

export type ItemUpdateIn = {
  category: CATEGORY;
  title: string;
  description?: string;
  price: number;
  params: ItemParams;
};