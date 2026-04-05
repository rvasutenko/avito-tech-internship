
import { CATEGORY } from "@/entities/item/model/category";
import type { TreeNodeData } from "@mantine/core";

export const categoriesTree: TreeNodeData[] = [
  {
    label: "Категория",
    value: "root",
    children: [
      { label: "Авто", value: CATEGORY.AUTO },
      { label: "Электроника", value: CATEGORY.ELECTRONICS },
      { label: "Недвижимость", value: CATEGORY.REAL_ESTATE },
    ],
  },
];
