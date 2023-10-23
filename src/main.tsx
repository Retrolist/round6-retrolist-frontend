import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import { CreateListChooseProjectsPageRoute } from "./pages/lists/create/CreateListChooseProjectsPage";
import { CreateListClassicScoringPageRoute } from "./pages/lists/create/CreateListClassicScoringPage";
import { CreateListFinalizePageRoute } from "./pages/lists/create/CreateListFinalizePage";
import { CreateListInfoPageRoute } from "./pages/lists/create/CreateListInfoPage";
import { CreateListRubricPageRoute } from "./pages/lists/create/CreateListRubricPage";
import { CreateListRubricScoringPageRoute } from "./pages/lists/create/CreateListRubricScoringPage";
import { CreateListTypePageRoute } from "./pages/lists/create/CreateListTypePage";
import { ListsPageRoute } from "./pages/lists/ListsPage";
import ProjectPage from "./pages/lists/project";
import { AntdAlertProvider } from "./providers/AntdAlertProvider";
import { RainbowKitConfigProvider } from "./providers/RainbowKitConfigProvider";
import { CreateListReducerRouteWrapper } from "./stores/CreateListReducer";

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
      CreateListClassicScoringPageRoute,
      CreateListFinalizePageRoute,
    ],
  },
  {
    path: "/project/retrolist",
    element: <ProjectPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RainbowKitConfigProvider>
    <AntdAlertProvider>
      <RouterProvider router={router} />
    </AntdAlertProvider>
  </RainbowKitConfigProvider>
);
