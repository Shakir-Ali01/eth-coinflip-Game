import React, { useState } from 'react'
import { ethers } from 'ethers';
import { formatEther } from "ethers";
const MetaMask = () => {
    const[errorMessage,setErrorMessage]=useState(null);
    const[defaultAccount,setDefaultAccount]=useState(null);
    const[userBalance,setUserBalance]=useState(null);
    
    const connectWallets=()=>{
        if(window.ethereum){
            window.ethereum.request({method:'eth_requestAccounts'})
            .then(result=>{
                accountChanged([result[0]])
            })

        }else{
            setErrorMessage("Install meta mask");
        }
    }
    const accountChanged=(accountName)=>{
        setDefaultAccount(accountName);
        getUserBalance(accountName);
    }
    const getUserBalance=(accountAddress)=>{
   
    window.ethereum.request({
        method: 'eth_getBalance',
        params: [String(accountAddress), "latest"]
      })
      .then(balance => {
        console.log(formatEther(balance));
        setUserBalance(formatEther(balance));
      })
      .catch(error => {
        console.error(error.message);
      });
    }
    const [side, setSide] = useState("");
  const flipCoin = async () => {
    if(window.ethereum){
       console.log(window.ethereum);
     if(side!=""){
     const randomSide = Math.random() > 0.5 ? "heads" : "tails";
     const isWinner = randomSide === side;
      if (isWinner) {
  //      const signer = library.getSigner();
  //      const tx = await signer.sendTransaction({
  //      to: account,
  //      value: formatEther.parseEther((amount * 2).toString()),
  //    });
  //      await tx.wait();
       alert("You won!");
       if(userBalance==0){
        setUserBalance(2);
       }else{
        setUserBalance(userBalance*2);
       }
       
     } else {
       alert("You lost!");
     }
    }else{
      alert("Coin Side Not Selected !");
    }
  }
    else{
      alert("Wallet Not Connect Please Connect Your Wallet !");
    }
};
  return (
    <div className='mt-5'>
    <div>
    <div className='row'>
      <div className='col-4'></div>
      <div className="col-8">

      <div class="card" style={{width:'24rem'}}>
  {/* <img class="card-img-top" src=".../100px180/" alt="Card image cap"/> */}
  <div class="card-body">
    <h5 class="card-title text-center mb-4"><span className='text-success'>Ethereum</span> CoinFlip Game</h5>
     
     <div className='row'>
     
        <div className='row'>
        <div className='col-4'> 
             <button className={'mb-3 btn btn-primary '}>Address</button>
          </div> 
        <div className='col-6'><h6>{defaultAccount}</h6>
        </div> 
        </div>
          
        
      
      <div className='row'>
         <div className='col-6'> <button className={'mt-3 mb-3 btn btn-success'}>Balance</button></div>
          <div className='col-6'><h6 className='mt-3'>{userBalance}</h6></div>
      
      </div>
     </div>
     {/* Select Coin Side  */}
     <div className='row'>
        <div className='col-6'><select className="form-control" value={side} onChange={(e) => setSide(e.target.value)}>
        <option value="">--Select Coin Side--</option>
        <option value="heads">Heads</option>
        <option value="tails">Tails</option>
      </select></div>
        <div className='col-6'><button className="btn btn-primary" style={{ width:'100%' }} onClick={flipCoin}>Flip Coin</button></div>
      </div>
     {/* End Select Coin Side */}
    <a href="#" onClick={connectWallets} class="btn btn-lg btn-success mt-3" style={{height:'30px',width:'100%',lineHeight:'10px'}}>ConnectWallet</a>
      
    
      
    </div>
    {errorMessage}
  </div>
</div>
      </div>
    </div>
  
    </div>
  )
}

export default MetaMask