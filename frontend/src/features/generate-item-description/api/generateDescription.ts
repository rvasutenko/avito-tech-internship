import type { ItemUpdateIn } from "@/entities/item/api/types";
import { api } from "@/shared/api/base";

export async function generateDescription(payload: ItemUpdateIn) {
  const res = await api.post("/ai/generate-description", payload);

  return res.data;
}
