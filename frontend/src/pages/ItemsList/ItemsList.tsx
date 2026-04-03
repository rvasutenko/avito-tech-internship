import { ItemsFilter, ItemsGrid, SearchBar } from "@/features";
import { Grid, Stack, Title } from "@mantine/core";
import { ItemsTotal } from "./ui/ItemsTotal";
import { useSyncFiltersWithUrl } from "@/features/ItemsFilter/model/useSyncFiltersWithUrl";
import { observer } from "mobx-react-lite";

export const ItemsList = observer(() => {
  useSyncFiltersWithUrl();

  return (
    <Grid>
      <Grid.Col span={12}>
        <Stack gap={"sm"}>
          <Stack gap={4}>
            <Title order={2}>Мои объявления</Title>
            <ItemsTotal />
          </Stack>
          <SearchBar />
        </Stack>
      </Grid.Col>
      <Grid.Col span={3}>
        <ItemsFilter />
      </Grid.Col>
      <Grid.Col span={9}>
        <ItemsGrid />
      </Grid.Col>
    </Grid>
  );
});
