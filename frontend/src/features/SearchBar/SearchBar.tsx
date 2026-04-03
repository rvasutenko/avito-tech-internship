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
import { useState } from "react";

export const SearchBar = () => {
  const [value, setValue] = useState("");

  const iconProps = {
    style: { display: "block" },
    size: 20,
  };

  return (
    <Group className={s.searchBar} align={"center"} gap={"xs"}>
      <Input
        leftSection={<MagnifyingGlassIcon />}
        variant="filled"
        placeholder="Найти объявление..."
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
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
                <SquaresFourIcon {...iconProps} />
                <VisuallyHidden>Preview</VisuallyHidden>
              </>
            ),
          },
          {
            value: "code",
            label: (
              <>
                <ListBulletsIcon {...iconProps} />
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
