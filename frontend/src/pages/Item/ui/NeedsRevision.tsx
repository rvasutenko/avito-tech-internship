import type { ItemGetOut } from "@/entities/item/api/types";
import {
  getItemParamsKeys,
  mapItemParamKey,
} from "@/entities/item/model/params";
import { Alert } from "@mantine/core";
import { InfoIcon } from "@phosphor-icons/react";

export const NeedsRevision = ({ data }: { data: ItemGetOut }) => {
  const getUncompleted = () => {
    const uncompleted: string[] = [];
    const keys = getItemParamsKeys(data.category);

    keys.forEach((key) => {
      if (!data.params[key as keyof ItemGetOut["params"]])
        uncompleted.push(
          mapItemParamKey(data.category, key as keyof ItemGetOut["params"])
        );
    });

    return uncompleted;
  };

  const uncompleted = getUncompleted();

  if (!uncompleted.length) return null;

  return (
    <Alert
      color="orange"
      title="Требуются доработки"
      icon={<InfoIcon />}
      style={{ width: "fit-content" }}
      mb={16}
    >
      У объявления не заполнены поля:
      <br />
      {uncompleted.map((i) => `«${i}»`).join(", ")}
    </Alert>
  );
};
