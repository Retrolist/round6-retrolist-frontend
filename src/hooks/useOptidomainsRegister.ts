import { useCallback, useEffect, useState } from "react";
import { useAccount } from "wagmi";
import { useOptidomains } from "./useOptidomains";
import { message } from "antd";
import { v4 as uuid } from "uuid";
import { namehash } from "viem";

export function useOptidomainsRegister() {
  const { address } = useAccount();

  const [isExistingDomainName, setIsExistingDomainName] = useState(false)
  const [domainName, setDomainName] = useState<string | null>(null);
  const [twitter, setTwitter] = useState("");
  const [discord, setDiscord] = useState("");

  const { domainName: existingDomainName, profiles: existingProfiles } =
    useOptidomains(address);

  useEffect(() => {
    if (existingDomainName) {
      // check if social profiles exists
      const twitter_ = existingProfiles.find(profile => profile.provider == 'com.twitter')?.identity
      const discord_ = existingProfiles.find(profile => profile.provider == 'com.discord')?.identity

      if (twitter_ && discord_) {
        setDomainName(existingDomainName)
        setTwitter(twitter_)
        setDiscord(discord_)
        setIsExistingDomainName(true)
      }
    }
  }, [existingDomainName, existingProfiles]);

  const performSocialLogin = useCallback((provider: string) => {
    const nonce = uuid();

    const url = new URL(
      import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT +
        "/social/" +
        provider +
        "/auth"
    );

    if (domainName) {
      url.searchParams.set("node", namehash(domainName));
    } else {
      if (provider != 'twitter') {
        message.error("Please connect your twitter first")
        window.alert("Please connect your twitter first")
        return
      }
    }

    url.searchParams.set(
      "callback",
      import.meta.env.VITE_SOCIAL_ORACLE_CALLBACK
    );
    url.searchParams.set("nonce", nonce);

    window.addEventListener("message", (event) => {
      if (event.origin != window.location.origin) return;

      // console.log(event)

      if (typeof event.data === "string" && event.data.startsWith(nonce)) {
        const data = JSON.parse(event.data.substr(nonce.length))
        // console.log(data)

        if (data.status == 'success') {
          if (provider == 'twitter') {
            setDomainName(data.identity.replace(/_/g, '-').toLowerCase() + '.town')
            setTwitter(data.identity)
          } else if (provider == 'discord') {
            setDiscord(data.identity)
          }
        } else {
          return message.error(data.message || 'Internal Server Error')
        }
      }
    })

    window.open(url);
  }, [domainName, setDomainName]);

  return {
    domainName,
    twitter,
    discord,
    performSocialLogin,
    isExistingDomainName,
  }
}
