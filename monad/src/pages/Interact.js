import React, { useState } from 'react';
import { ethers } from 'ethers';

const contractAddress = "0x35DB6d5831770A885204245bc4bb7Cf936882817";
const abi = [
  "function owner() view returns (address)"
];

const Interact = () => {
  const [wallet, setWallet] = useState(null);
  const [contractOwner, setContractOwner] = useState("");
  const [connectedAddress, setConnectedAddress] = useState("");
  const [contract, setContract] = useState(null);

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

      setWallet(signer);
      setConnectedAddress(address);

      const contractInstance = new ethers.Contract(contractAddress, abi, signer);
      setContract(contractInstance);

      console.log("Carteira conectada:", address);
    } catch (err) {
      console.error("Erro ao conectar a carteira:", err);
    }
  };

  const getOwner = async () => {
    try {
      if (!contract) {
        console.log("Contrato não foi carregado ainda.");
        return;
      }

      const owner = await contract.owner();
      console.log("Dono do contrato:", owner);
      setContractOwner(owner);
    } catch (error) {
      console.error("Erro ao buscar dono do contrato:", error);
      if (error.code === 'BAD_DATA') {
        console.log("Verifique se o endereço e o ABI estão corretos e se o contrato possui a função owner().");
      }
    }
  };

  return (
    <div>
      <h2>Interact with WaifuBattleArena</h2>
      <button onClick={connectWallet}>🔌 Conectar Carteira</button>
      {connectedAddress && <p>Conectado como: {connectedAddress}</p>}

      <button onClick={getOwner}>👑 Ver Dono do Contrato</button>
      {contractOwner && <p><strong>Owner:</strong> {contractOwner}</p>}
    </div>
  );
};

export default Interact;
