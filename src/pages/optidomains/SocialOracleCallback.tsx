import { useEffect } from "react";

let ALREADY_POST = false

export default function SocialOracleCallback() {
  useEffect(() => {
    setTimeout(() => {
      if (!ALREADY_POST) {
        ALREADY_POST = true;
  
        const urlSearchParams = new URLSearchParams(window.location.search);
        const params = Object.fromEntries(urlSearchParams.entries());
    
        console.log(params.nonce + JSON.stringify(params))
    
        window.opener.postMessage(params.nonce + JSON.stringify(params), window.location.origin)
    
        setTimeout(() => window.close(), 400);
      }
    }, 100)
  })

  return (
    <div></div>
  )
}