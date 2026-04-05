import { ItemsFilter, ItemsGrid, SearchBar } from "@/features";
import { Grid, Stack, Title } from "@mantine/core";
import { ItemsTotal } from "./ui/ItemsTotal";
import { useSyncFiltersWithUrl } from "@/features/ItemsFilter/model/useSyncFiltersWithUrl";
import { observer } from "mobx-react-lite";
import { useStores } from "@/app/providers";
import { useItems } from "@/entities";

export const ItemsList = observer(() => {
  const { filters } = useStores();
  const { data, isLoading } = useItems(filters.queryParams);

  useSyncFiltersWithUrl();

  return (
    <Grid>
      <Grid.Col span={12}>
        <Stack gap={"sm"}>
          <Stack gap={4}>
            <Title order={2}>Мои объявления</Title>
            <ItemsTotal total={data?.total!} isLoading={isLoading} />
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
