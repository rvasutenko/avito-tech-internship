import { api } from "@/shared/api/base";
import type {
  ItemGetOut,
  ItemsGetIn,
  ItemsGetOut,
  ItemUpdateIn,
} from "./types";

export class ItemService {
  static async getAll(params: ItemsGetIn): Promise<ItemsGetOut> {
    const res = await api.get("/items", { params });

    return res.data;
  }

  static async getById(id: number): Promise<ItemGetOut> {
    const res = await api.get(`/items/${id}`);

    return res.data;
  }

  static async updateById(id: number, payload: ItemUpdateIn): Promise<any> {
    const clearObj = (obj: Record<string, any>) =>
      Object.fromEntries(Object.entries(obj).filter(([_, v]) => v != null));

    const cleanPayload = clearObj(payload);
    cleanPayload.params = clearObj(cleanPayload.params);

    const res = await api.put(`/items/${id}`, cleanPayload);

    return res.data;
  }
}
