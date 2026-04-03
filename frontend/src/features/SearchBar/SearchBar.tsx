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
  ListBulletsIcon,
  MagnifyingGlassIcon,
  SquaresFourIcon,
} from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { useDebouncedValue } from "@mantine/hooks";
import { DEBOUNCE_WAIT } from "./config";

export const SearchBar = () => {
  const { filters } = useStores();

  const [value, setValue] = useState(filters.search);
  const [debounced] = useDebouncedValue(value, DEBOUNCE_WAIT);

  useEffect(() => {
    filters.setSearch(debounced);
  }, [debounced]);

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
            <Input.ClearButton
              aria-label="Clear input"
              onClick={() => setValue("")}
            />
          ) : null
        }
        flex={1}
      />
      <SegmentedControl
        size="md"
        data={[
          {
            value: "preview",
            label: (
              <>
                <SquaresFourIcon style={{ display: "block" }} size={20} />
                <VisuallyHidden>Preview</VisuallyHidden>
              </>
            ),
          },
          {
            value: "code",
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
        data={[
          "Сначала новые",
          "Сначала старые",
          "Сначала дешевле",
          "Сначала дороже",
          "А → Я",
          "Я → А",
        ]}
        variant="filled"
      />
    </Group>
  );
};
