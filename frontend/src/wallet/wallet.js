import Web3 from "web3";
import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

export const MetaMaskconnector = new InjectedConnector({ supportedChainIds: [4] });

export const walletconnect = new WalletConnectConnector({
  rpc: { 4: "https://rinkeby.infura.io/v3/4c4bc80bdac94b5390950776ca678dc9"},
  chainId: 4,
  supportedChainIds:[4],
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

export const getLibrary = provider => {
  return new Web3(provider);
}