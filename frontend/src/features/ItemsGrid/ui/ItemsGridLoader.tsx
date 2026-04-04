import { Grid } from "@mantine/core";
import { ItemCardSkeleton } from "@/entities/item/ui/ItemCard/ItemCardSkeleton";
import { ON_PAGE_COUNT } from "../config";

export const ItemsGridLoader = ({ onRow }: { onRow: number }) => {
  return (
    <Grid gap={"md"}>
      {Array.from({ length: ON_PAGE_COUNT }).map((_, i) => (
        <ItemCardSkeleton key={i} onRow={onRow} />
      ))}
    </Grid>
  );
};
