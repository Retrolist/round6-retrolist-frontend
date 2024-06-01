import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import "./index.css";

import { RubricBaseScoreFormRoute } from "./pages/lists/create/Form/RubicBaseScoreForm";
import { SelectProjectFormRoute } from "./pages/lists/create/Form/SelectProjectForm";
import { SubmitListFormRoute } from "./pages/lists/create/Form/SubmitListForm";
import { CreateListUserDetailFormRoute } from "./pages/lists/create/Form/ListDetailForm";
import { ProjectsPageRoute } from "./pages/lists/ProjectsPage";
import ProjectPage from "./pages/lists/project";
import { AntdAlertProvider } from "./providers/AntdAlertProvider";
import { RainbowKitConfigProvider } from "./providers/RainbowKitConfigProvider";
import { CreateListReducerRouteWrapper } from "./stores/CreateListReducer";
import SocialOracleCallback from "./pages/optidomains/SocialOracleCallback";
import { ListsPageRoute } from "./pages/lists/ListsPage";
import { ListPageRoute } from "./pages/lists/ListPage";
import { SubmitListSuccessRoute } from "./pages/lists/create/Form/SubmitListSuccess";

import "./polyfills.ts"
import { AnalyticsPageRoute } from "./pages/analytics/AnalyticsPage.tsx";
import { IncludedInBallotsProvider } from "./hooks/useIncludedInBallots.tsx";
import { OPDistributionProvider } from "./hooks/useOPDistribution.tsx";
import { ProjectCountProvider } from "./hooks/useProjectCount.tsx";

const router = createBrowserRouter([
  ProjectsPageRoute,
  {
    ...ProjectsPageRoute,
    path: "/project",
  },

  // View List
  ListsPageRoute,
  ListPageRoute,

  // Analytics
  AnalyticsPageRoute,

  // Create List
  {
    path: "/lists/create",
    element: <CreateListReducerRouteWrapper />,
    children: [
      CreateListUserDetailFormRoute,
      SelectProjectFormRoute,
      RubricBaseScoreFormRoute,
      SubmitListFormRoute,
      SubmitListSuccessRoute,

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
      <IncludedInBallotsProvider>
        <OPDistributionProvider>
          <ProjectCountProvider>
            <RouterProvider router={router} />
          </ProjectCountProvider>
        </OPDistributionProvider>
      </IncludedInBallotsProvider>
    </AntdAlertProvider>
  </RainbowKitConfigProvider>
);
