import { api } from "@/shared/api/base";
import type { ItemGetOut, ItemsGetIn, ItemsGetOut, ItemUpdateIn } from "./types";

export class ItemService {
  static async getAll(params: ItemsGetIn): Promise<ItemsGetOut> {
    const res = await api.get("/items", { params });

    return res.data;
  }

  static async getById(id: number): Promise<ItemGetOut> { // TODO: define type
    const res = await api.get(`/items/${id}`);

    return res.data;
  }

  static async updateById(id: number, payload: ItemUpdateIn): Promise<any[]> { // TODO: define type
    const res = (await api.put(`/items/${id}`, payload)) as any; // TODO: define type

    return res.data;
  }
}
