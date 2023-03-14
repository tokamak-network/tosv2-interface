import { Contract } from "ethers";

export type TokensData = {
  chainId: number;
  tokenAddress: string;
  token: {
    chainId: number;
    decimals: number;
    symbol: string;
    name: string;
    isNative: boolean;
    isToken: boolean;
    address: string;
  };
};

export type TokenNames = "ETH" | "TON" | "WTON" | "TOS" | "sTOS" | "LTOS";
export type TokenDecimals = 18 | 27;
export type SupportedToken = {
  tokenName: TokenNames;
  decimals: TokenDecimals;
  contract?: Contract;
};
export type SupportedTokenList = SupportedToken[];
