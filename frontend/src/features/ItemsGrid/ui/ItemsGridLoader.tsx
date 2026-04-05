import { Grid } from "@mantine/core";
import { ItemCardSkeleton } from "@/entities/item/ui/ItemCard/ItemCardSkeleton";
import { ON_PAGE_COUNT } from "../config";
import { observer } from "mobx-react-lite";
import { useStores } from "@/app/providers";

export const ItemsGridLoader = observer(({ onRow }: { onRow: number }) => {
  const {
    filters: { view },
  } = useStores();

  return (
    <Grid gap={"md"}>
      {Array.from({ length: ON_PAGE_COUNT }).map((_, i) => (
        <ItemCardSkeleton key={i} onRow={onRow} horizontal={view === "list"} />
      ))}
    </Grid>
  );
});
