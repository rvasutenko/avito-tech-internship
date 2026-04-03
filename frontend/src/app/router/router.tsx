import { createBrowserRouter, Navigate } from "react-router-dom";

import { ItemsList, Root } from "@/pages";
import { ROUTES_NAMES } from "./types";

export const createRoutes = () => {
  return createBrowserRouter([
    {
      path: ROUTES_NAMES.ROOT,
      element: <Root />,
      children: [
        {
          path: ROUTES_NAMES.ADS_LIST,
          element: <ItemsList />,
        },
        {
          path: "*",
          element: <Navigate to={ROUTES_NAMES.ADS_LIST} replace />,
        },
      ],
    },
  ]);
};
