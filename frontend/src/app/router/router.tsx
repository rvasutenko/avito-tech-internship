import { createBrowserRouter, Navigate } from "react-router-dom";

import { Item, ItemsList, Root } from "@/pages";
import { ROUTES_NAMES } from "./types";
import { ItemEdit } from "@/pages/ItemEdit/ItemEdit";

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
          path: ROUTES_NAMES.AD,
          element: <Item />,
        },
        {
          path: ROUTES_NAMES.AD_EDIT,
          element: <ItemEdit />,
        },
        {
          path: "*",
          element: <Navigate to={ROUTES_NAMES.ADS_LIST} replace />,
        },
      ],
    },
  ]);
};
