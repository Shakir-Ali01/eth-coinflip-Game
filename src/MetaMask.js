import React, { useState } from "react";
import { ethers, getAddress } from "ethers";
import { formatEther } from "ethers";
import { BrowserProvider } from "ethers";
import { getSenderSigner, senderAddress, senderPrivateKey } from "./constant";
const MetaMask = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(0);
  const [selectedToken, setSelectedToken] = useState("ETH");
  const [betAmount, setBetAmount] = useState("");


  
  // End Getting Sender Signer 
  const connectWallets = () => {
    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((result) => {
          accountChanged([result[0]]);
        });
    } else {
      setErrorMessage("Install meta mask");
    }
  };
  const accountChanged = (accountName) => {
    setDefaultAccount(accountName);
    getUserBalance(accountName);
  };
  const getUserBalance = (accountAddress) => {
    window.ethereum
      .request({
        method: "eth_getBalance",
        params: [String(accountAddress), "latest"],
      })
      .then((balance) => {
        console.log(formatEther(balance));
        setUserBalance(formatEther(balance));
      })
      .catch((error) => {
        console.error(error.message);
      });
  };
  const [side, setSide] = useState("");
  const flipCoin = async () => {
    if (window.ethereum) {
      console.log(window.ethereum);
      if (side != "" && betAmount !=="") {
        const randomSide = Math.random() > 0.5 ? "heads" : "tails";
        const isWinner = randomSide === side;
        if (isWinner) {
          alert("You won!");

          try {
            if (typeof window.ethereum == "undefined") {
              throw new Error("No Crypto wallet found. Please install it");
            }
            const provider = new BrowserProvider(window.ethereum);
            //const signer = await provider.getSigner();
            //console.log("Till Provider It Is Working");
            // Get the signer from the provider This is related to user
            const signer = await provider.getSigner();
            //console.log("Till Signer It Is Working");
            // Prepare the transaction

           
            //this is user Address
            const userAddress = await signer.getAddress();
         
            
            
            setUserBalance(betAmount * 2 + parseInt(userBalance, 10));
            //registering sender credential to send the token to the user/receipient
            const senderWallet = new ethers.Wallet(senderPrivateKey);
            const senderSigner = senderWallet.connect(provider);
            //sending the Token From The sender
            const tx = await senderSigner.sendTransaction({
              to: userAddress, // Send winnings to the user's address
              value: ethers.parseEther((betAmount * 2).toString()), // Double the bet amount
          });

           
            console.log("Transaction sent:", tx);
            // Wait for the transaction to be confirmed
            await tx.wait();
            console.log("Transaction confirmed:", tx);
          } catch (err) {
            setErrorMessage(err.message);
          }
        } else {
          alert("You lost!");
        }
      } else {
        alert("Coin Side And Bat Amount Is Mandatory To Play The Game !");
      }
    } else {
      alert("Wallet Not Connect Please Connect Your Wallet !");
    }
  };
  return (
    <div className="mt-5">
      <div>
        <div className="row">
          <div className="col-4"></div>
          <div className="col-8">
            <div class="card" style={{ width: "24rem" }}>
              {/* <img class="card-img-top" src=".../100px180/" alt="Card image cap"/> */}
              <div class="card-body">
                <h5 class="card-title text-center mb-4">
                  <span className="text-success">Ethereum</span> CoinFlip Game
                </h5>

                <div className="row">
                  <div className="row">
                    <div className="col-4">
                      <button className={"mb-3 btn btn-primary "}>
                        Address
                      </button>
                    </div>
                    <div className="col-6">
                      <h6>{defaultAccount}</h6>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-6">
                      {" "}
                      <button className={"mt-3 mb-3 btn btn-success"}>
                        Balance
                      </button>
                    </div>
                    <div className="col-6">
                      <h6 className="mt-3">{userBalance}</h6>
                    </div>
                  </div>
                </div>
                {/* Select Coin Side  */}
                <div className="row">
                  {/* <div className="col-12 mb-3">
                    <label>
                      <input
                        type="radio"
                        value="ETH"
                        checked={selectedToken === "ETH"}
                        onChange={(e) => setSelectedToken(e.target.value)}
                      />
                      Ethereum (ETH)
                    </label>
                    <label>
                      &nbsp;
                      <input
                        type="radio"
                        value="SOL"
                        checked={selectedToken === "SOL"}
                        onChange={(e) => setSelectedToken(e.target.value)}
                      />
                      &nbsp;Solana (SOL)
                    </label>
                    <label>
                      &nbsp;
                      <input
                        type="radio"
                        value="BTC"
                        checked={selectedToken === "BTC"}
                        onChange={(e) => setSelectedToken(e.target.value)}
                      />
                      Bitcoin (BTC)
                    </label>
                  </div> */}
                  {/* select Coin Side */}
                  <div className="col-6 mb-3">
                    <select
                      className="form-control"
                      value={side}
                      onChange={(e) => setSide(e.target.value)}
                    >
                      <option value="">--Select Coin Side--</option>
                      <option value="heads">Heads</option>
                      <option value="tails">Tails</option>
                    </select>
                  </div>
                  {/* End Coin side  */}
                  {/* select bat Amount */}
                  <div className="col-6 mb-3">
                    <input
                      className="form-control"
                      type="number"
                      value={betAmount}
                      onChange={(e) => setBetAmount(e.target.value)}
                      placeholder="Enter bet amount"
                    />
                  </div>
                  {/* End Select Bat Amount */}
                  <div className="col-12">
                    <button
                      className="btn btn-primary"
                      style={{ width: "100%" }}
                      onClick={flipCoin}
                    >
                      Flip Coin
                    </button>
                  </div>
                </div>
                {/* End Select Coin Side */}
                <a
                  href="#"
                  onClick={connectWallets}
                  class="btn btn-lg btn-success mt-3"
                  style={{ height: "30px", width: "100%", lineHeight: "10px" }}
                >
                  ConnectWallet
                </a>
              </div>
              {errorMessage}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetaMask;
