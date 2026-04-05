import { Affix, ActionIcon, useMantineColorScheme } from "@mantine/core";
import { SunIcon, MoonIcon } from "@phosphor-icons/react";

export const ThemeToggle = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <Affix position={{ bottom: 20, right: 20 }}>
      <ActionIcon
        variant="filled"
        size="xl"
        radius="xl"
        onClick={() => toggleColorScheme()}
      >
        {isDark ? <SunIcon size={18} /> : <MoonIcon size={18} />}
      </ActionIcon>
    </Affix>
  );
};
