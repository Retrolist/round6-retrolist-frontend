import { useAccount, useContractRead } from "wagmi";
import PublicResolverFacetABI from "../../abis/PublicResolverFacet.json";
import ENSRegistryABI from "../../abis/ENSRegistry.json";
import { ReactNode } from "react";
import { namehash } from "viem";
import React from "react";

// Hardcoded for Opti.domains V1
const ENSRegistry = {
  address: '0x888811b3DFC94566Fc8F6aC5e86069981a50B490',
  abi: ENSRegistryABI,
}

export const PrimaryDomainContext = React.createContext<string | null>(null)

export function PrimaryDomainProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { address, isConnected } = useAccount();

  const node = namehash(
    (
      (address && isConnected ? address.substring(2) + "." : "") + "addr.reverse"
    ).toLowerCase()
  );

  const {
    data: resolver,
    isError: isResolverError,
    isLoading: isResolverLoading,
  } = useContractRead({
    address: address && isConnected ? ENSRegistry.address as `0x${string}` : undefined,
    abi: ENSRegistry.abi,
    functionName: "resolver",
    args: [node],
  });

  const {
    data: primaryDomain,
    isError,
    isLoading,
  } = useContractRead({
    address:
      address &&
      isConnected &&
      !isResolverError &&
      !isResolverLoading &&
      (resolver as any) != "0x0000000000000000000000000000000000000000"
        ? (resolver as any)
        : undefined,
    abi: PublicResolverFacetABI,
    functionName: "name",
    args: [node],
  });

  return (
    <PrimaryDomainContext.Provider value={(primaryDomain as string) || null}>
      {children}
    </PrimaryDomainContext.Provider>
  );
}