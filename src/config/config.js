import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";

export const MetaMaskconnector = new InjectedConnector({ supportedChainIds: [4] });

export const getLibrary = provider => {
  return new Web3(provider);
}