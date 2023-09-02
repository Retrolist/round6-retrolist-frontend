import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ListsPageRoute } from "./pages/lists/ListsPage";
import { CreateListTypePageRoute } from "./pages/lists/create/CreateListTypePage";
import { CreateListReducerRouteWrapper } from "./stores/CreateListReducer";
import { RainbowKitConfigProvider } from "./providers/RainbowKitConfigProvider";
import { AntdAlertProvider } from "./providers/AntdAlertProvider";
import { CreateListInfoPageRoute } from "./pages/lists/create/CreateListInfoPage";

const router = createBrowserRouter([
  ListsPageRoute,
  {
    ...ListsPageRoute,
    path: "/lists",
  },

  // Create List
  {
    path: "/lists/create",
    element: <CreateListReducerRouteWrapper />,
    children: [
      CreateListTypePageRoute,
      CreateListInfoPageRoute,
    ],
  }
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RainbowKitConfigProvider>
      <AntdAlertProvider>
        <RouterProvider router={router} />
      </AntdAlertProvider>
    </RainbowKitConfigProvider>
  </React.StrictMode>
);
