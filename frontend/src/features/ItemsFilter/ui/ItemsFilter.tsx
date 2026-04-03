import { useStores } from "@/app/providers";
import {
  Button,
  Card,
  Divider,
  Space,
  Stack,
  Switch,
  Text,
  Title,
} from "@mantine/core";
import { TreeView } from "./TreeView";

export const ItemsFilter = () => {
  const { filters } = useStores();

  return (
    <Stack gap={"xs"}>
      <Card padding="lg" radius={"md"}>
        <Title order={5}>Фильтры</Title>
        <Space h="xs" />
        <TreeView />
        <Divider mt="md" mb="md" />
        <Switch
          checked={filters.needsRevision}
          onChange={(e) => filters.setNeedsRevision(e.currentTarget.checked)}
          labelPosition="left"
          label="Только требующие доработок"
          styles={{
            body: { justifyContent: "space-between", alignItems: "center" },
          }}
        />
      </Card>

      <Button
        variant="white"
        color="black"
        size="md"
        onClick={() => filters.reset()}
      >
        <Text size="sm" fw={600}>
          Сбросить фильтры
        </Text>
      </Button>
    </Stack>
  );
};
