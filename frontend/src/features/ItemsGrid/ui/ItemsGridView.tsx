import { ItemCard } from "@/entities";
import { Grid, Pagination, Space } from "@mantine/core";
import type { ItemsGetOut } from "@/entities/item/api/types";
import { useStores } from "@/app/providers";

type ItemsGridViewProps = {
  data: ItemsGetOut;
  onRow: number;
  onClick: () => void;
};

export const ItemsGridView = ({ data, onRow, onClick }: ItemsGridViewProps) => {
  const hash = (ad: Record<string, any>) => Object.values(ad).join("-");
  const { filters } = useStores();

  return (
    <>
      <Grid gap={"md"}>
        {data?.items?.map((ad, i) => (
          <ItemCard
            key={`${hash(ad)}-${i}`}
            onRow={onRow}
            onClick={onClick}
            {...ad}
          />
        ))}
      </Grid>
      <Space h={"xl"} />
      <Pagination
        total={Math.ceil((data?.total || 0) / filters.limit)}
        value={filters.page}
        onChange={(page) => filters.setPage(page)}
      />
    </>
  );
};
