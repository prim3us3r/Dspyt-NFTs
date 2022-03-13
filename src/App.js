import "./App.css";
import { Contract, ethers } from "ethers";
import { useEffect, useState } from "react";
import contractABI from "./contractABI.json";
 
const contractAddress = "0xaf60494febd1cc9593c96f0d9712c68c2c116d7f";
 
function App() {
 
    const [account, setAccount] = useState(null);
    const [isWalletInstalled, setIsWalletInstalled] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  // state for whether app is minting or not.
    const [isMinting, setIsMinting] = useState(false);
 
 
  useEffect(() => {
        if (window.ethereum) {
            setIsWalletInstalled(true);
        }
    }, []);
 
  useEffect(() => {
        function initNFTContract() {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      setNFTContract(new Contract(contractAddress,contractABI.abi,signer));
        }
        initNFTContract();
    }, [account]);
 
 
  async function connectWallet() {
        window.ethereum
            .request({
                method: "eth_requestAccounts",
            })
            .then((accounts) => {
                setAccount(accounts[0]);
            })
            .catch((error) => {
                alert("Something went wrong");
            });
    }
 
 
    const data = [
        {
            url: "https://solless.mypinata.cloud/ipfs/Qma3mdd9wXFz6XV9zxxZLEiEhs2sFWV5WZVVBxbJ84V5So/1.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmS7dVJU6XiR4fH7hfCj5tKtxssNf4oE85evZXAZtCsvkz/5')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/Qma3mdd9wXFz6XV9zxxZLEiEhs2sFWV5WZVVBxbJ84V5So/2.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmS7dVJU6XiR4fH7hfCj5tKtxssNf4oE85evZXAZtCsvkz/4')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/Qma3mdd9wXFz6XV9zxxZLEiEhs2sFWV5WZVVBxbJ84V5So/3.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmS7dVJU6XiR4fH7hfCj5tKtxssNf4oE85evZXAZtCsvkz/3')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/Qma3mdd9wXFz6XV9zxxZLEiEhs2sFWV5WZVVBxbJ84V5So/4.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmS7dVJU6XiR4fH7hfCj5tKtxssNf4oE85evZXAZtCsvkz/2)",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/Qma3mdd9wXFz6XV9zxxZLEiEhs2sFWV5WZVVBxbJ84V5So/5.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmS7dVJU6XiR4fH7hfCj5tKtxssNf4oE85evZXAZtCsvkz/1')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/QmYe881E52m1twk5kzKkC98XVEPyrmb8n14YEeiKCVnoGA/6.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmfVPUaNBL4FGAVbTWq4KfqNUntfYne5wtN8xzJ13o51oA/6')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/QmYe881E52m1twk5kzKkC98XVEPyrmb8n14YEeiKCVnoGA/7.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmfVPUaNBL4FGAVbTWq4KfqNUntfYne5wtN8xzJ13o51oA/7')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/QmYe881E52m1twk5kzKkC98XVEPyrmb8n14YEeiKCVnoGA/8.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmfVPUaNBL4FGAVbTWq4KfqNUntfYne5wtN8xzJ13o51oA/8')",
        },
        {
          url: "https://solless.mypinata.cloud/ipfs/QmYe881E52m1twk5kzKkC98XVEPyrmb8n14YEeiKCVnoGA/9.png",
            param: "handleMint('https://solless.mypinata.cloud/ipfs/QmfVPUaNBL4FGAVbTWq4KfqNUntfYne5wtN8xzJ13o51oA/9')",
        },
    ];
 
    async function withdrawMoney(){
        try {
 
            const response = await NFTContract.withdrawMoney();
            console.log("Received: ", response);
          } catch (err) {
              alert(err);
          }
 
    }
 
    async function handleMint(tokenURI) {
        setIsMinting(true);
            try {
              const options = {value: ethers.utils.parseEther("0.01")};
              const response = await NFTContract.mintNFT(tokenURI, options);
              console.log("Received: ", response);
            } catch (err) {
                alert(err);
            }
            finally {
              setIsMinting(false);
            }
    }
 
    if (account === null) {
      return (
        <>
         <div className="container">
           <br/>
          <h1> 🔮 BELAJAR WEB3</h1>
          <h2>NFT Marketplace</h2>
          <p>Buy an NFT from our marketplace.</p>
 
          {isWalletInstalled ? (
            <button onClick={connectWallet}>Connect Wallet</button>
          ) : (
            <p>Install Metamask wallet</p>
          )}
          </div>
          </>
      );
    }
 
    return (
        <>
            <div className="container">
            <br/>
            <h1> 🔮 BELAJAR WEB3</h1>
 
             <h2>NFT Marketplace</h2>
                {data.map((item, index) => (
                    <div className="imgDiv">
                        <img
                            src={item.url}
                            key={index}
                            alt="images"
                            width={250}
                            height={250}
                        />
                        <button isLoading={isMinting}
                            onClick={() => {
                                eval(item.param);
                            }}
                        >
                            Mint - 0.01 eth
                        </button>
                    </div>
                ))}
                 <button 
                            onClick={() => {
                                withdrawMoney();
                            }}
                        >
                            Withdraw Money from Contract
                 </button>
 
        </div>
 
        </>
    );
}
 
export default App;