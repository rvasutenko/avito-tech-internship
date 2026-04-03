import { ItemCard } from "@/entities/item";
import { Grid, Pagination, Space } from "@mantine/core";
import { ON_PAGE_COUNT } from "../config";
import type { ItemsGetOut } from "@/entities/item/api/types";

type ItemsGridViewProps = {
  data: ItemsGetOut;
  onRow: number;
  onClick: () => void;
};

export const ItemsGridView = ({ data, onRow, onClick }: ItemsGridViewProps) => {
  const hash = (ad: Record<string, any>) => Object.values(ad).join("-");

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
      <Pagination total={ON_PAGE_COUNT} onChange={() => {}} />
    </>
  );
};
