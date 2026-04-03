import type { CATEGORY } from "@/entities/item/model/category";
import { makeAutoObservable } from "mobx";

export class ItemsFilterStore {
  categories: CATEGORY[] = [];
  needsRevision = false;

  constructor() {
    makeAutoObservable(this);
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
    };
  }
}
