import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0xDee6d4c8f9fc26F9cd831088C333d8D8Fa843B42";
const abi = [
  "function transfer(address to, uint256 amount) public returns (bool)",
  "function balanceOf(address account) view returns (uint256)"
];

const Transfer = () => {
  const [wallet, setWallet] = useState(null);
  const [connectedAddress, setConnectedAddress] = useState("");
  const [contract, setContract] = useState(null);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState("0");

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask não encontrado. Instale a extensão.");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const address = await signer.getAddress();

      setWallet(signer);
      setConnectedAddress(address);

      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);

      // Obter o saldo do usuário
      const balanceBN = await contractInstance.balanceOf(address);
      setBalance(ethers.formatUnits(balanceBN, 18));
    } catch (err) {
      console.error("Erro ao conectar a carteira:", err);
    }
  };

  const sendTokens = async () => {
    if (!contract || !toAddress || !amount) return;
    try {
      const tx = await contract.transfer(toAddress, ethers.parseUnits(amount, 18));
      await tx.wait();
      alert("Transferência realizada!");
    } catch (err) {
      console.error("Erro na transferência:", err);
    }
  };

  return (
    <div>
      <h2>Transferência de Tokens</h2>
      <button onClick={connectWallet}>🔌 Conectar Carteira</button>
      {connectedAddress && <p>Carteira: {connectedAddress}</p>}
      {connectedAddress && <p>Saldo: {balance} Tokens</p>}

      <input
        type="text"
        placeholder="Endereço do destinatário"
        value={toAddress}
        onChange={(e) => setToAddress(e.target.value)}
      />
      <input
        type="text"
        placeholder="Quantidade"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={sendTokens}>📤 Enviar</button>
    </div>
  );
};

export default Transfer;
