import { useQuery, useMutation } from "@tanstack/react-query";
import { ItemService } from "../api/index";
import type {
  ItemGetOut,
  ItemsGetIn,
  ItemsGetOut,
  ItemUpdateIn,
} from "../api/types";
import type { ApiError } from "@/shared/api/ApiError";

export const useItems = (params: ItemsGetIn) => {
  return useQuery<ItemsGetOut, ApiError>({
    queryKey: ["items", params],
    queryFn: () => ItemService.getAll(params),
  });
};

export const useItem = (id: number) => {
  return useQuery<ItemGetOut, ApiError>({
    queryKey: ["item", id],
    queryFn: () => ItemService.getById(id),
    retry: (failureCount, error) => {
      if (error?.status === 404) return false;
      return failureCount < 3;
    },
  });
};

export const useUpdateItem = () => {
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: ItemUpdateIn }) =>
      ItemService.updateById(id, data),
  });
};
