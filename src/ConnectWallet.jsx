// import React, { useEffect, useState } from "react";
// import { formatEther } from "ethers"; // Updated import for ethers v6.x
// import { useWeb3React } from "@web3-react/core";
// import { InjectedConnector } from "@web3-react/injected-connector";

// const injected = new InjectedConnector({ supportedChainIds: [1, 3, 4, 5, 42] });

// function ConnectWallet() {
//   const { activate, active, account, library } = useWeb3React();
//   const [balance, setBalance] = useState(null);

//   useEffect(() => {
//     if (active) {
//       library.getBalance(account).then((result) => {
//         setBalance(formatEther(result)); // Updated to use formatEther directly
//       });
//     }
//   }, [active, account, library]);

//   const connectWallet = async () => {
//     try {
//       await activate(injected);
//     } catch (error) {
//       console.error("Failed to connect wallet:", error);
//     }
//   };

//   return (
//     <div>
//       {!active ? (
//         <button onClick={connectWallet}>Connect to MetaMask</button>
//       ) : (
//         <div>
//           <p>Account: {account}</p>
//           <p>Balance: {balance} ETH</p>
//         </div>
//       )}
//     </div>
//   );
// }

// export default ConnectWallet;
