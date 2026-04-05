import type { ItemUpdateIn } from "@/entities/item/api/types";
import type { ControllerRenderProps } from "react-hook-form";

export const getRevisionStyle = (
  field: ControllerRenderProps<ItemUpdateIn, any>
) => {
  return !field.value
    ? {
        input: { border: "1px solid orange" },
      }
    : {};
};
