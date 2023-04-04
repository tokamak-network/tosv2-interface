export enum SupportedChain {
  L1_mainnet = 1,
  //will be changed to Sepolia
  L1_testnet = 5,
  L2_mainnet = 9999999,
  L2_testnet = 5050,
}

export type ChainName =
  | "L1_mainnet"
  | "L1_testnet"
  | "L2_mainnet"
  | "L2_testnet";

export type SuppoortedChainInfo = {
  chainName: ChainName;
  chainId: SupportedChain;
  rpc: URL;
};

export type SuuportedChainList = SuppoortedChainInfo[];
