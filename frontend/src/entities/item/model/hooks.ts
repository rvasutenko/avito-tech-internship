import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ItemService } from "../api/index";
import type {
  ItemGetOut,
  ItemsGetIn,
  ItemsGetOut,
  ItemUpdateIn,
} from "../api/types";
import type { ApiError } from "@/shared/api/ApiError";
import { notifications } from "@mantine/notifications";

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
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: ItemUpdateIn }) =>
      ItemService.updateById(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["item", id] });
      queryClient.invalidateQueries({ queryKey: ["items"] });

      notifications.show({
        title: "Изменения сохранены",
        message: "Объявление успешно изменено",
        position: "top-right",
        color: "green",
      });
    },
    onError: () => {
      notifications.show({
        title: "Ошибка сохранения",
        message:
          "При попытке сохранить изменения произошла ошибка. Попробуйте ещё раз или зайдите позже.",
        position: "top-right",
        color: "red",
      });
    },
  });
};
