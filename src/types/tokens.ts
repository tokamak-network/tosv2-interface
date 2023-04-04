import { Contract } from "ethers";
import { SupportedInputTokenTypes } from "types";
import CONTRACT_ADDRESS, {
  CONTRACT_ADDRESSES_TYPE,
} from "services/addresses/contract";
import { SupportedChain } from "./constant";

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

// export type UserTokenBalance
const { TON_ADDRESS, WTON_ADDRESS, TOS_ADDRESS, StakingV2Proxy } =
  CONTRACT_ADDRESS;

type TokenMap = Readonly<{
  tokenName: SupportedInputTokenTypes;
  tokenAddress: CONTRACT_ADDRESSES_TYPE[keyof CONTRACT_ADDRESSES_TYPE] | "0x00";
  decimals: 18 | 27;
}>;

export type ChainTokenMap = TokenMap[];

export const SupportedChainTokenMap: ChainTokenMap = [
  {
    tokenName: "TON",
    tokenAddress: TON_ADDRESS,
    decimals: 18,
  },
  {
    tokenName: "WTON",
    tokenAddress: WTON_ADDRESS,
    decimals: 27,
  },
  {
    tokenName: "TOS",
    tokenAddress: TOS_ADDRESS,
    decimals: 18,
  },
  {
    tokenName: "LTOS",
    tokenAddress: StakingV2Proxy,
    decimals: 18,
  },
];
