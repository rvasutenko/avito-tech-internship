import { useItems } from "@/entities";
import { useStores } from "@/app/providers";
import { ItemsGridView } from "./ItemsGridView";
import { ItemsGridLoader } from "./ItemsGridLoader";
import { ItemsGridError } from "./ItemsGridError";
import { ItemsGridEmpty } from "./ItemsGridEmpty";
import { DEFAULT_ON_ROW } from "../config";

export const ItemsGrid = ({ onRow = DEFAULT_ON_ROW }: { onRow?: number }) => {
  const { filters } = useStores();

  const { data, isLoading, isError, error } = useItems(filters.queryParams);

  if (isLoading) return <ItemsGridLoader onRow={onRow} />;

  if (isError && error?.status === 500) {
    return <ItemsGridError />;
  }

  if (data?.items?.length === 0) {
    return <ItemsGridEmpty />;
  }

  return <ItemsGridView data={data!} onRow={onRow} />;
};
