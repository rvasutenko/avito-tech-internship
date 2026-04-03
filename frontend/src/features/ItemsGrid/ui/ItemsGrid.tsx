import { useItems } from "@/entities/item";
import { useStores } from "@/app/providers";
import { useNavigate } from "react-router-dom";
import { ROUTES_NAMES } from "@/app/router";
import { ItemsGridView } from "./ItemsGridView";
import { ItemsGridLoader } from "./ItemsGridLoader";
import { ItemsGridError } from "./ItemsGridError";
import { ItemsGridEmpty } from "./ItemsGridEmpty";

export const ItemsGrid = ({ onRow = 4 }: { onRow?: number }) => {
  const { filters } = useStores();
  const nav = useNavigate();

  const { data, isLoading, isError, error } = useItems(filters.queryParams);

  const handleClick = () => nav(ROUTES_NAMES.AD.replace(":id", "ik"));

  if (isLoading) return <ItemsGridLoader onRow={onRow} />;

  if (isError && error?.status === 500) {
    return <ItemsGridError />;
  }

  if (data?.items?.length === 0) {
    return <ItemsGridEmpty />;
  }

  return <ItemsGridView data={data!} onRow={onRow} onClick={handleClick} />;
};
