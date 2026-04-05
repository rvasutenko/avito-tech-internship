import type { CATEGORY } from "../model/category";
import type { ItemParams } from "../model/params";

export type SortColumn = "title" | "createdAt";
export type SortDirection = "asc" | "desc";

export type ItemGetOut = {
  id: number;
  category: CATEGORY;
  title: string;
  description: string;
  price: number;
  createdAt: string;
  updatedAt: string;
  params: ItemParams;
  needsRevision: boolean;
};

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
    id: number;
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
