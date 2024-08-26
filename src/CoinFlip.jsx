// import React, { useState } from "react";
// // import { ethers } from "ethers";
// import { useWeb3React } from "@web3-react/core";
// import { formatEther } from "ethers";

// function CoinFlip() {
//   const { account, library } = useWeb3React();
//   const [amount, setAmount] = useState("");
//   const [side, setSide] = useState("");

//   const flipCoin = async () => {
//     const randomSide = Math.random() > 0.5 ? "heads" : "tails";
//     const isWinner = randomSide === side;

//     if (isWinner) {
//       const signer = library.getSigner();
//       const tx = await signer.sendTransaction({
//         to: account,
//         value: formatEther.parseEther((amount * 2).toString()),
//       });
//       await tx.wait();
//       alert("You won!");
//     } else {
//       alert("You lost!");
//     }
//   };

//   return (
//     <div>
//       <input
//         type="number"
//         placeholder="Amount in ETH"
//         value={amount}
//         onChange={(e) => setAmount(e.target.value)}
//       />
//       <select value={side} onChange={(e) => setSide(e.target.value)}>
//         <option value="heads">Heads</option>
//         <option value="tails">Tails</option>
//       </select>
//       <button onClick={flipCoin}>Flip Coin</button>
//     </div>
//   );
// }

// export default CoinFlip;
