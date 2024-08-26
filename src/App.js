import logo from './logo.svg';
import './App.css';

import { Web3ReactProvider } from '@web3-react/core';
import { Web3Provider } from "@ethersproject/providers";
import MetaMask from './MetaMask';


function App() {
 
  return (
 
     <div>
       
        <MetaMask></MetaMask>
      
      </div>
 
  
  );
}

export default App;
