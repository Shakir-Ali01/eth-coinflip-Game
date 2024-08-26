import logo from './logo.svg';
import './App.css';
import ConnectWallet from "./ConnectWallet";
import CoinFlip from "./CoinFlip";
import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import MetaMask from './MetaMask';
import CoinFlips from './CoinFlips';

function App() {
  // function getLibrary(provider) {
  //   console.log("Provider:", provider);
  //   if (!provider) {
  //     console.error("Web3 provider is undefined");
  //     return null;
  //   }
  //   return new Web3Provider(provider);
  // }
  return (
    //<Web3ReactProvider getLibrary={getLibrary}>
     <div>
       
        <MetaMask></MetaMask>
      
      </div>
   // </Web3ReactProvider>
  
  );
}

export default App;
