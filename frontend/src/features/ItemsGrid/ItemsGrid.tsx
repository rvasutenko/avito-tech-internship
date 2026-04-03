import { ItemCard, useItems } from "@/entities/item";
import { Grid, Pagination, Space } from "@mantine/core";
import { ItemCardSkeleton } from "@/entities/item/ui/ItemCard/ItemCardSkeleton";
import { useStores } from "@/app/providers";
import { observer } from "mobx-react-lite";
import { ON_PAGE_COUNT } from "./config";

export const ItemsGrid = observer(({ onRow = 4 }: { onRow?: number }) => {
  const { filters } = useStores();
  const { data, isLoading } = useItems(filters.queryParams);

  const hash = (ad: Record<string, any>) => Object.values(ad).join("-");

  if (isLoading)
    return (
      <Grid gap={"md"}>
        {Array.from({ length: ON_PAGE_COUNT }).map((_, index) => (
          <ItemCardSkeleton key={index} onRow={onRow} />
        ))}
      </Grid>
    );

  return (
    <>
      <Grid gap={"md"}>
        {data?.items?.map((ad, i) => (
          <ItemCard
            key={`${hash(ad)}-${i}`}
            onRow={onRow}
            {...ad}
          />
        ))}
      </Grid>
      <Space h={"xl"} />
      <Pagination total={ON_PAGE_COUNT} onChange={() => {}} />
    </>
  );
});
