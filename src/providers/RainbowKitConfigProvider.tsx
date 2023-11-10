import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { ReactNode } from "react";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { optimism, optimismGoerli } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
import { SiweAuthProvider } from "./SiweAuthProvider";

const { chains, publicClient } = configureChains(
  [optimism],
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

export function RainbowKitConfigProvider({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <SiweAuthProvider>
        <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
      </SiweAuthProvider>
    </WagmiConfig>
  );
}