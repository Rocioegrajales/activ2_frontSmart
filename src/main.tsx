import '@rainbow-me/rainbowkit/styles.css';
import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { getDefaultConfig, RainbowKitProvider } from '@rainbow-me/rainbowkit';
import { arbitrum, arbitrumSepolia } from 'viem/chains';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const config = getDefaultConfig({
  appName: 'My FrontSmart App',
  projectId: import.meta.env.VITE_PROJECT_ID,
  chains: [arbitrumSepolia, arbitrum],
  ssr: true, // If your dApp uses server side rendering (SSR)
});

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <App />
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>   
  </React.StrictMode>
)
