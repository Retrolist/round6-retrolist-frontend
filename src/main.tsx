import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "@rainbow-me/rainbowkit/styles.css";
import "react-farcaster-embed/dist/styles.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "./index.css";
import { ListPageRoute } from "./pages/lists/ListPage";
import { ListsPageRoute } from "./pages/lists/ListsPage";
import { ProjectsPageRoute } from "./pages/lists/ProjectsPage";
import { CreateListUserDetailFormRoute } from "./pages/lists/create/Form/ListDetailForm";
import { RubricBaseScoreFormRoute } from "./pages/lists/create/Form/RubicBaseScoreForm";
import { SelectProjectFormRoute } from "./pages/lists/create/Form/SelectProjectForm";
import { SubmitListFormRoute } from "./pages/lists/create/Form/SubmitListForm";
import { SubmitListSuccessRoute } from "./pages/lists/create/Form/SubmitListSuccess";
import ProjectPage from "./pages/lists/project";
import SocialOracleCallback from "./pages/optidomains/SocialOracleCallback";
import { AntdAlertProvider } from "./providers/AntdAlertProvider";
import { RainbowKitConfigProvider } from "./providers/RainbowKitConfigProvider";
import { CreateListReducerRouteWrapper } from "./stores/CreateListReducer";

import { IncludedInBallotsProvider } from "./hooks/useIncludedInBallots.tsx";
import { OPDistributionProvider } from "./hooks/useOPDistribution.tsx";
import { ProjectCountProvider } from "./hooks/useProjectCount.tsx";
import { AnalyticsPageRoute } from "./pages/analytics/AnalyticsPage.tsx";
import "./polyfills.ts";

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
