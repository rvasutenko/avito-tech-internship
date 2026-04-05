import { useMutation } from "@tanstack/react-query";
import { notifications } from "@mantine/notifications";
import type { ItemUpdateIn } from "@/entities/item/api/types";
import { generateDescription } from "../api/generateDescription";

export const useGenerateDescription = () => {
  return useMutation({
    mutationFn: ({ data }: { data: ItemUpdateIn }) => generateDescription(data),
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
