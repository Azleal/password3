'use client';
import {
  RainbowKitProvider,
  getDefaultConfig,
  getDefaultWallets,
} from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as React from 'react';
import { WagmiProvider } from 'wagmi';
import {
  scroll,
  scrollSepolia
} from 'wagmi/chains';

const { wallets } = getDefaultWallets();

const config = getDefaultConfig({
  appName: 'Password3',
  projectId: 'e35fd85500a0fa08a923cc272a7b240a',
  wallets: [
    ...wallets,
  ],
  chains: [
    scroll,
    scrollSepolia
  ],
  ssr: true,
});

const queryClient = new QueryClient();

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>{children}</RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
