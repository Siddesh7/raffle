"use client";

import * as React from "react";
import {
  RainbowKitProvider,
  getDefaultWallets,
  getDefaultConfig,
  darkTheme,
} from "@rainbow-me/rainbowkit";
import {
  argentWallet,
  trustWallet,
  ledgerWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {polygon} from "wagmi/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {http, WagmiProvider} from "wagmi";

const {wallets} = getDefaultWallets();

const config = getDefaultConfig({
  appName: "web3raffles",
  projectId: "61c85254bd4fbb528882f6a3043c428c",
  wallets: [
    ...wallets,
    {
      groupName: "Other",
      wallets: [argentWallet, trustWallet, ledgerWallet],
    },
  ],
  chains: [polygon],
  transports: {
    [polygon.id]: http(process.env.NEXT_PUBLIC_ALCHEMY_RPC_URL),
  },
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider coolMode theme={darkTheme()}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
