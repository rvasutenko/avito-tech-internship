import type { SortColumn, SortDirection } from "@/entities/item/api/types";
import type { CATEGORY } from "@/entities/item/model/category";
import { makeAutoObservable } from "mobx";

export class ItemsFilterStore {
  categories: CATEGORY[] = [];
  needsRevision = false;

  search = "";
  sortColumn: SortColumn = "createdAt";
  sortDirection: SortDirection = "desc";

  page = 1;
  limit = 10;

  constructor() {
    makeAutoObservable(this);
  }

  setFromQuery(params: URLSearchParams) {
    this.search = params.get("q") || "";

    this.categories = params.get("categories")
      ? (params.get("categories")!.split(",") as CATEGORY[])
      : [];

    this.needsRevision = params.get("needsRevision") === "true";

    const sortColumn = params.get("sortColumn") as SortColumn || "createdAt";
    const sortDirection = params.get("sortDirection") as SortDirection || "desc";

    this.sortColumn = sortColumn;
    this.sortDirection = sortDirection;

    this.page = Number(params.get("page") || 1);
  }

  get queryString() {
    const params = new URLSearchParams();

    if (this.search) params.set("q", this.search);

    if (this.categories.length)
      params.set("categories", this.categories.join(","));

    if (this.needsRevision) params.set("needsRevision", "true");

    if (this.needsRevision) params.set("needsRevision", "true");

    if (this.sortColumn) params.set("sortColumn", this.sortColumn);

    if (this.sortDirection) params.set("sortDirection", this.sortDirection);

    params.set("page", String(this.page));

    return params.toString();
  }

  setSearch(value: string) {
    this.search = value;
    this.page = 1;
  }
  
  setSort(value: string) {
    const [column, direction] = value.split("_") as [SortColumn, SortDirection];
  
    this.sortColumn = column;
    this.sortDirection = direction;
  }

  get sortValue() {
    return `${this.sortColumn}_${this.sortDirection}`;
  }

  setPage(page: number) {
    this.page = page;
  }

  toggleCategory(category: CATEGORY) {
    if (this.categories.includes(category)) {
      this.categories = this.categories.filter((c) => c !== category);
    } else {
      this.categories = [...this.categories, category];
    }
  }

  setNeedsRevision(value: boolean) {
    this.needsRevision = value;
  }

  reset() {
    this.categories = [];
    this.needsRevision = false;
  }

  get queryParams() {
    const categoriesString = [...this.categories].sort().join(",");

    return {
      categories: categoriesString || undefined,
      needsRevision: this.needsRevision || undefined,
      q: this.search || undefined,
      sortColumn: this.sortColumn || undefined,
      sortDirection: this.sortDirection || undefined,
      limit: this.limit,
      skip: (this.page - 1) * this.limit,
    };
  }
}
