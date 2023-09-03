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
import { CreateListChooseProjectsPageRoute } from "./pages/lists/create/CreateListChooseProjectsPage";
import { CreateListRubricPageRoute } from "./pages/lists/create/CreateListRubricPage";
import { CreateListRubricScoringPageRoute } from "./pages/lists/create/CreateListRubricScoringPage";

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
      CreateListChooseProjectsPageRoute,
      CreateListRubricPageRoute,
      CreateListRubricScoringPageRoute,
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
