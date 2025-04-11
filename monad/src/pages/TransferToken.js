// src/pages/TransferToken.js
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0x35DB6d5831770A885204245bc4bb7Cf936882817"; // substitua pelo contrato real
const abi = [
  "function transfer(address to, uint amount) public returns (bool)",
  "function balanceOf(address) view returns (uint)"
];

const TransferToken = () => {
  const [provider, setProvider] = useState(null);
  const [signer, setWallet] = useState(null);
  const [contract, setContract] = useState(null);
  const [toAddress, setToAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [connectedAddress, setConnectedAddress] = useState('');
  const [balance, setBalance] = useState('');

  

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert("MetaMask não encontrado. Instale a extensão.");
        return;
      }
  
      console.log("Solicitando conexão com a carteira...");
      const provider = new ethers.BrowserProvider(window.ethereum);
  
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const signer = await provider.getSigner();
      const address = await signer.getAddress();
  
      // Configura as variáveis de estado
      setWallet(signer);
      setConnectedAddress(address);
  
      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);
  
      // Verifica o saldo após a conexão
      const balance = await contractInstance.balanceOf(address);
      setBalance(ethers.formatUnits(balance, 18)); // Exemplo de como formatar o saldo
  
      console.log("Carteira conectada:", address);
    } catch (err) {
      console.error("Erro ao conectar a carteira:", err);
      alert("Erro ao conectar a carteira. Tente novamente.");
    }
  };
  
  
  

  const sendTokens = async () => {
    if (!contract || !toAddress || !amount) {
      alert("Preencha o endereço e o valor.");
      return;
    }
  
    try {
      const amountParsed = ethers.parseUnits(amount, 18); // Usa o valor digitado
  
      const tx = await contract.transfer(toAddress, amountParsed);
      await tx.wait();
  
      alert(`Transferência enviada! Hash: ${tx.hash}`);
    } catch (error) {
      console.error("Erro ao transferir tokens:", error);
      alert("Erro ao transferir tokens: " + (error?.reason || error?.message));
    }
  };
  
  

  return (
    <div style={{ padding: "20px" }}>
      <h2>📤 Transferência de Tokens</h2>
      {!connectedAddress && <button onClick={connectWallet}>Conectar Carteira</button>}
      {connectedAddress && (
        <>
          <p><strong>Carteira:</strong> {connectedAddress}</p>
          <p><strong>Saldo:</strong> {balance} Tokens</p>

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
          <button onClick={sendTokens}>Enviar</button>
        </>
      )}
    </div>
  );
};

export default TransferToken;
