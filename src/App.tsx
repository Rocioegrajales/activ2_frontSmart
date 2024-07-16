import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useState } from 'react';
// import reactLogo from './assets/react.svg';
// import viteLogo from '/vite.svg';
import './App.css';
import { useAccount } from 'wagmi';

function App() { 
  const { address, } = useAccount();

  return (
    <main className="w-full flex justify-center items-center min-h-svh flex-col">
      <h1 className="text-4xl font-bold">🚀 CFE Token Faucet 🚀</h1>    
        <ConnectButton />    
      {/* </div> */}
    </main>
  )
};

export default App
