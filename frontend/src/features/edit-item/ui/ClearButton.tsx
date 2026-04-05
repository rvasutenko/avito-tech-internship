import { type ControllerRenderProps } from "react-hook-form";
import { Input } from "@mantine/core";
import type { ItemUpdateIn } from "@/entities/item/api/types";

export const ClearButton = ({
  field,
}: {
  field: ControllerRenderProps<ItemUpdateIn, any>;
}) => {
  return field.value ? (
    <Input.ClearButton
      aria-label="Clear input"
      onClick={() => field.onChange(null)}
    />
  ) : null;
};
