import { namehash } from "viem";
import { useContractRead } from "wagmi";
import PublicResolverFacetABI from "../abis/PublicResolverFacet.json";
import ENSRegistryABI from "../abis/ENSRegistry.json";

// Hardcoded for Opti.domains V1
const ENSRegistry = {
  address: '0x888811b3DFC94566Fc8F6aC5e86069981a50B490',
  abi: ENSRegistryABI,
}

export function usePrimaryDomain(address?: string): string | null | undefined {
  const node = namehash(
    (
      (address ? address.substring(2) + "." : "") + "addr.reverse"
    ).toLowerCase()
  );

  const {
    data: resolver,
    isError: isResolverError,
    isLoading: isResolverLoading,
  } = useContractRead({
    address: address ? ENSRegistry.address as `0x${string}` : undefined,
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
      !isResolverError &&
      !isResolverLoading &&
      (resolver as any) != "0x0000000000000000000000000000000000000000"
        ? (resolver as any)
        : undefined,
    abi: PublicResolverFacetABI,
    functionName: "name",
    args: [node],
  });

  return primaryDomain as (string | null | undefined)
}