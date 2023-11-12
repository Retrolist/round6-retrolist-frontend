import { AuthenticationStatus, RainbowKitAuthenticationProvider, createAuthenticationAdapter } from '@rainbow-me/rainbowkit';
import { ethers } from 'ethers';
import { createContext, useCallback, useEffect, useState } from 'react';
import { useChainId } from 'wagmi';
import { useAccount } from 'wagmi';
import { SiweMessage } from '../types/SiweMessage';

export const SiweAuthContext = createContext("unauthenticated")

export function SiweAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address, isConnected } = useAccount();
  const chainId = useChainId()

  const [status, setStatus] = useState<AuthenticationStatus>("loading")

  const authenticationAdapter = createAuthenticationAdapter({
    getNonce: async () => {
      const response = await fetch(import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/siwe/nonce', {
        credentials: 'include',
      });
      return await response.text();
    },
  
    createMessage: ({ nonce, address, chainId }) => {
      return new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign in to RetroList',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce,
      });
    },
  
    getMessageBody: ({ message }) => {
      return message.prepareMessage();
    },
  
    verify: async ({ message, signature }) => {
      const authEndpoints = [
        import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/siwe/verify?testnet=' + import.meta.env.VITE_DEV_MODE,
        import.meta.env.VITE_API_HOST + '/siwe/verify?testnet=' + import.meta.env.VITE_DEV_MODE,
      ]

      for (const endpoint of authEndpoints) {
        const verifyRes = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, signature }),
          credentials: 'include',
        });
    
        if (verifyRes.ok) {
          setStatus("authenticated")
        } else {
          setStatus("unauthenticated")
  
          try {
            const data = await verifyRes.json();
  
            if (data.message) {
              window.alert(data.message)
            }
          } finally {
            return false
          }
        }
      }

      return true
    },
  
    signOut: async () => {
      await fetch(import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/siwe/logout', {
        method: 'POST',
        credentials: 'include',
      });
      setStatus("unauthenticated")
    },
  });

  const refreshMe = useCallback(async () => {
    try {
      if (!isConnected) {
        setStatus('unauthenticated')
        return
      }
  
      const response = await fetch(import.meta.env.VITE_SOCIAL_ORACLE_ENDPOINT + '/siwe/me', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json()
        const nowPlus1day = new Date()
        nowPlus1day.setDate(nowPlus1day.getDate() + 1)
        
        if (
          data.address?.toLowerCase() == address?.toLowerCase() && 
          data.chainId == chainId &&
          (!data.expirationTime || nowPlus1day < new Date(data.expirationTime))
        ) {
          setStatus('authenticated')
        } else {
          setStatus('unauthenticated')
        }
      } else {
        setStatus('unauthenticated')
      }
    } catch (err) {
      console.error(err)
      setStatus('unauthenticated')
    }
  }, [address, chainId, isConnected])

  useEffect(() => {
    refreshMe()
  }, [address, chainId, isConnected])

  return (
    <SiweAuthContext.Provider value={status}>
      <RainbowKitAuthenticationProvider
        adapter={authenticationAdapter}
        status={status}
      >
        {children}
      </RainbowKitAuthenticationProvider>
    </SiweAuthContext.Provider>
  )
}