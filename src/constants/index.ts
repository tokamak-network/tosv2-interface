import { injected, trazorConnector } from "connectors/";
import { WalletInfo } from "types/wallet";
// import { DEPLOYED_TYPE } from "./type";
import { ethers } from "ethers";

export const REACT_APP_MODE = process.env.REACT_APP_MODE as string;
export const NetworkContextName = `${new Date().getTime()}-NETWORK`;
export const DEFAULT_NETWORK = REACT_APP_MODE === "DEV" ? 4 : 1;
export const ZERO_ADDRESS = "0x0000000000000000000000000000000000000000";
const MAINNET_API = process.env.API_PRODUCTION;
const DEV_API = process.env.API_DEV;

export const BASE_PROVIDER =
  REACT_APP_MODE === "DEV"
    ? ethers.getDefaultProvider("rinkeby")
    : ethers.getDefaultProvider("mainnet");

export const MIDDLEWARE_API = REACT_APP_MODE === "DEV" ? MAINNET_API : DEV_API;

export const SUPPORTED_WALLETS: { [key: string]: WalletInfo } = {
  INJECTED: {
    connector: injected,
    name: "Injected",
    iconName: "metamask.svg",
    description: "Injected web3 provider.",
    href: null,
    color: "#010101",
    primary: true,
    type: "INJECTED",
  },
  METAMASK: {
    connector: injected,
    name: "MetaMask",
    iconName: "metamask.svg",
    description: "Easy-to-use browser extension.",
    href: null,
    color: "#E8831D",
    type: "METAMASK",
  },
  TREZOR: {
    connector: trazorConnector,
    name: "Trezor",
    iconName: "trezor.png",
    description: "Hardware Wallet.",
    href: null,
    color: "#E8831D",
    type: "TREZOR",
  },
};
