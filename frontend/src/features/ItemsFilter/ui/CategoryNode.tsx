import { useStores } from "@/app/providers";
import type { CATEGORY } from "@/entities/item/model/category";
import { Checkbox, Group, Text, type TreeNodeData } from "@mantine/core";
import { observer } from "mobx-react-lite";

export const CategoryNode = observer(({ node }: { node: TreeNodeData }) => {
  const { filters } = useStores();

  return (
    <Checkbox.Card
      mt={8}
      withBorder={false}
      checked={filters.categories.includes(node.value as CATEGORY)}
      onChange={() => filters.toggleCategory(node.value as CATEGORY)}
    >
      <Group gap="xs">
        <Checkbox.Indicator />
        <Text size="sm">{node.label}</Text>
      </Group>
    </Checkbox.Card>
  );
});
