import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./router";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { QueryProvider, RootStoreProvider } from "./providers";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import { useLocalStorage } from "@mantine/hooks";
import { ThemeToggle } from "@/features/color-theme";

export const App = () => {
  const router = createRoutes();

  const [colorScheme, _] = useLocalStorage<"light" | "dark">({
    key: "color-scheme",
    defaultValue: "light",
  });

  return (
    <RootStoreProvider>
      <QueryProvider>
        <ColorSchemeScript defaultColorScheme={colorScheme} />
        <MantineProvider defaultColorScheme={colorScheme}>
          <ThemeToggle />
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryProvider>
    </RootStoreProvider>
  );
};
