import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount, useReadContract, useWriteContract } from 'wagmi';
import { abi } from './assets/abis/FSCTokenAbi';
import { FSC_CONTRACT_ADDRESS } from "./assets/constants/index";
import { useState } from 'react';
import { waitForTransactionReceipt } from 'viem/actions';
import { config } from "./main";
import { toast, ToastContainer } from "react-toastify";

function App() { 
  const { address, isConnected } = useAccount();
  const [ isMinting, setIsMinting] = useState(false);

  const { data, isLoading, refetch } = useReadContract({
    abi,
    address: FSC_CONTRACT_ADDRESS,
    functionName: "balanceOf",
    args: [address],
  });

  const {writeContractAsync} = useWriteContract()

  const handleMint = async () => {
    setIsMinting(true); 

  try{
    const txHash = await writeContractAsync({
      abi,
      address: FSC_CONTRACT_ADDRESS,
      functionName: "mint",
      args: [address, 200],
    })

    await waitForTransactionReceipt(config, {
      confirmations: 1,
      hash: txHash,
    })

    setIsMinting(false);
    toast.success("Minted 200 FSC tokens");
    refetch();

  }catch (error) {
    console.error(error);
    toast.error("failed to mint FSC tokens");
    setIsMinting(false);
  }
};

  return (
    <main className="w-full flex justify-center items-center min-h-svh flex-col">
      <h1 className="text-5xl font-bold text-green-600 ">FSC TOKEN</h1>
      <h1 className="text-5xl font-bold text-green-600">Faucet</h1>    
      <div className="my-5 p-4 flex flex-col items-center gap-5 rounded border border-gray-400">
        <ConnectButton />        
        {isConnected ? (
          <div className="space-y-5">
            <p>
                <span>Balance:{" "}</span>
              {isLoading ? (
                <span className="opacity-50">Loading...</span>
              ) : (
                data?.toString()
              )}
            </p>

            <button className="px-3 py-1 font-semibold bg-green-600 rounded-xl disabled:opacity-50"
              disabled={isMinting}
              onClick={handleMint}>
              {isMinting ? "Minting..." : "Mint tokens"}
             </button>
          </div>
        ) : (
          <div>Please connect your wallet to use the faucet</div>
        )}
      </div>

      <footer>
          <h2>&#169;2024 - Todos los derechos reservdos - REGM</h2>
        </footer>

    </main>

    
  );
}

export default App;
