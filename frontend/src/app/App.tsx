import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./router";
import { MantineProvider } from "@mantine/core";
import { QueryProvider, RootStoreProvider } from "./providers";
import { Notifications } from "@mantine/notifications";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";

export const App = () => {
  const router = createRoutes();

  return (
    <RootStoreProvider>
      <QueryProvider>
        <MantineProvider>
          <Notifications />
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryProvider>
    </RootStoreProvider>
  );
};
