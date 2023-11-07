import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import { RubricBaseScoreFormRoute } from "./pages/lists/create/Form/RubicBaseScoreForm";
import { SelectProjectFormRoute } from "./pages/lists/create/Form/SelectProjectForm";
import { SubmitListFormRoute } from "./pages/lists/create/Form/SubmitListForm";
import { CreateListUserDetailFormRoute } from "./pages/lists/create/Form/UserDetailForm";
import { ListsPageRoute } from "./pages/lists/ListsPage";
import ProjectPage from "./pages/lists/project";
import { AntdAlertProvider } from "./providers/AntdAlertProvider";
import { RainbowKitConfigProvider } from "./providers/RainbowKitConfigProvider";
import { CreateListReducerRouteWrapper } from "./stores/CreateListReducer";
import SocialOracleCallback from "./pages/optidomains/SocialOracleCallback";

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
      CreateListUserDetailFormRoute,
      SelectProjectFormRoute,
      RubricBaseScoreFormRoute,
      SubmitListFormRoute,
      // CreateListTypePageRoute,
      // CreateListInfoPageRoute,
      // CreateListChooseProjectsPageRoute,
      // CreateListRubricPageRoute,
      // CreateListRubricScoringPageRoute,
      // CreateListClassicScoringPageRoute,
      // CreateListFinalizePageRoute,
    ],
  },

  // Project
  {
    path: "/project/:projectId",
    element: <ProjectPage />,
  },

  // Opti.domains
  {
    path: "/social-oracle-callback",
    element: <SocialOracleCallback />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RainbowKitConfigProvider>
    <AntdAlertProvider>
      <RouterProvider router={router} />
    </AntdAlertProvider>
  </RainbowKitConfigProvider>
);
