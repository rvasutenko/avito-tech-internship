import { useStores } from "@/app/providers";
import s from "./SearchBar.module.scss";
import {
  Group,
  Input,
  SegmentedControl,
  Select,
  VisuallyHidden,
} from "@mantine/core";
import {
  FunnelIcon,
  ListBulletsIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { DEBOUNCE_WAIT, SORT_OPTIONS } from "./config";
import { observer } from "mobx-react-lite";

export const SearchBar = observer(() => {
  const { filters } = useStores();

  const [value, setValue] = useState(filters.search);
  const [debounced] = useDebouncedValue(value, DEBOUNCE_WAIT);

  const clearSearch = () => setValue("");

  useEffect(() => {
    filters.setSearch(debounced);
  }, [debounced]);

  useEffect(() => {
    setValue(filters.search);
  }, [filters.search]);

  return (
    <Group className={s.searchBar} align={"center"} gap={"xs"}>
      <Input
        leftSection={<MagnifyingGlassIcon />}
        variant="filled"
        placeholder="Найти объявление..."
        value={value}
        onChange={(e) => setValue(e.currentTarget.value)}
        rightSection={
          value ? (
            <Input.ClearButton aria-label="Clear input" onClick={clearSearch} />
          ) : null
        }
        flex={1}
      />
      <SegmentedControl
        value={filters.view}
        onChange={(value) => filters.setView(value as "grid" | "list")}
        size="md"
        data={[
          {
            value: "grid",
            label: (
              <>
                <SquaresFourIcon style={{ display: "block" }} size={20} />
                <VisuallyHidden>Preview</VisuallyHidden>
              </>
            ),
          },
          {
            value: "list",
            label: (
              <>
                <ListBulletsIcon style={{ display: "block" }} size={20} />
                <VisuallyHidden>CodeIcon</VisuallyHidden>
              </>
            ),
          },
        ]}
      />
      <Select
        placeholder="Сортировать..."
        leftSection={<FunnelIcon />}
        value={filters.sortValue}
        onChange={(value) => filters.setSort(value!)}
        data={SORT_OPTIONS}
        variant="filled"
        allowDeselect={false}
      />
    </Group>
  );
});
