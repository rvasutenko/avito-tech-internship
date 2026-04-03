import { RouterProvider } from "react-router-dom";
import { createRoutes } from "./router";
import { MantineProvider } from "@mantine/core";
import "@mantine/core/styles.css";
import { QueryProvider, RootStoreProvider } from "./providers";

export const App = () => {
  const router = createRoutes();

  return (
    <RootStoreProvider>
      <QueryProvider>
        <MantineProvider>
          <RouterProvider router={router} />
        </MantineProvider>
      </QueryProvider>
    </RootStoreProvider>
  );
};
