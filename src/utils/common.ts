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

export function removeScientificNotation(num: string) {
  return (''+ +num).replace(/(-?)(\d*)\.?(\d*)e([+-]\d+)/,
    function(a,b,c,d,e) {
      return e < 0
        ? b + '0.' + Array(1-e-c.length).join('0') + c + d
        : b + c + d + Array(e-d.length+1).join('0');
    });
}

export function shadeColor(color: string, percent: number) {

  var R = parseInt(color.substring(1,3),16);
  var G = parseInt(color.substring(3,5),16);
  var B = parseInt(color.substring(5,7),16);

  R = Math.floor(R * (100 + percent) / 100);
  G = Math.floor(G * (100 + percent) / 100);
  B = Math.floor(B * (100 + percent) / 100);

  R = (R<255)?R:255;  
  G = (G<255)?G:255;  
  B = (B<255)?B:255;  

  R = Math.round(R)
  G = Math.round(G)
  B = Math.round(B)

  var RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
  var GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
  var BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

  return "#"+RR+GG+BB;
}

export function appendHttps(url: string) {
  if (url.startsWith('http://') || url.startsWith('https://')) return url
  return 'https://' + url
}
