import { useQuery, useMutation } from "@tanstack/react-query";
import { ItemService } from "../api/index";
import type { ItemsGetIn, ItemUpdateIn } from "../api/types";

export const useItems = (params: ItemsGetIn) => {
  return useQuery({
    queryKey: ["items", params],
    queryFn: () => ItemService.getAll(params),
  });
};

export const useItem = (id: string) => {
  return useQuery({
    queryKey: ["item", id],
    queryFn: () => ItemService.getById(id),
  });
};

export const useUpdateItem = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ItemUpdateIn }) =>
      ItemService.updateById(id, data),
  });
};
