import type { ItemUpdateIn } from "@/entities/item/api/types";
import { api } from "@/shared/api/base";

export async function getMarketPrice(payload: ItemUpdateIn) {
  const res = await api.post("/ai/get-market-price", payload);

  return res.data;
}
