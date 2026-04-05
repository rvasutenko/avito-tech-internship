import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { ItemUpdateIn } from "@/entities/item/api/types";
import { getMarketPrice } from "../api/getMarketPrice";

export const useGetMarketPrice = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ItemUpdateIn }) => getMarketPrice(data),
    onError: () => {
      notifications.show({
        title: "Произошла ошибка при запросе к AI",
        message: "Попробуйте повторить запрос позже",
        position: "top-right",
        color: "red",
      });
    },
  });
};
