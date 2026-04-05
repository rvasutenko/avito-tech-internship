import { ItemCard } from "@/entities";
import { Grid, Pagination, Space } from "@mantine/core";
import type { ItemsGetOut } from "@/entities/item/api/types";
import { useStores } from "@/app/providers";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAMES } from "@/app/router";
import { observer } from "mobx-react-lite";

type ItemsGridViewProps = {
  data: ItemsGetOut;
  onRow: number;
};

export const ItemsGridView = observer(({ data, onRow }: ItemsGridViewProps) => {
  const nav = useNavigate();
  const { filters } = useStores();

  const handleClick = (id: number) =>
    nav(ROUTES_NAMES.AD.replace(":id", String(id)));

  return (
    <>
      <Grid gap={"md"}>
        {data?.items?.map((ad) => (
          <ItemCard
            key={ad.id}
            onRow={onRow}
            onClick={handleClick.bind(null, ad.id)}
            horizontal={filters.view === "list"}
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
});
