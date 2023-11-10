import { ethers } from "ethers";

export function addrParse(addr: string): string {
  return addr.substring(0, 6) + '...' + addr.substring(addr.length - 4, addr.length);
}

export function sigmoid(x: number, xmul: number) {
  return 1/(1+Math.exp(-xmul * x))
}

export function buildSignatureHex(signature: {
  r: string;
  s: string;
  v: number;
}) {
  return ethers.concat([
    signature.r,
    signature.s,
    ethers.toBeHex(signature.v),
  ])
}
