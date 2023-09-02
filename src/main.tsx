import React, { ReactNode } from "react";
import ReactDOM from "react-dom/client";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import "./index.css";
import "@rainbow-me/rainbowkit/styles.css";

import { ListsPageRoute } from "./pages/lists/ListsPage";
import { CreateListTypePageRoute } from "./pages/lists/create/CreateListTypePage";

const { chains, publicClient } = configureChains(
  [optimismGoerli],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "RetroList",
  projectId: "YOUR_PROJECT_ID",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

const router = createBrowserRouter([
  ListsPageRoute,
  {
    ...ListsPageRoute,
    path: "/lists",
  },

  // Create List
  CreateListTypePageRoute,
]);

export function RainbowKitContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
    </WagmiConfig>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RainbowKitContextProvider>
      <RouterProvider router={router} />
    </RainbowKitContextProvider>
  </React.StrictMode>
);
