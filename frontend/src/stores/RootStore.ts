import { ItemsFilterStore } from "./ItemsFilterStore";

export class RootStore {
  filters = new ItemsFilterStore();
}
