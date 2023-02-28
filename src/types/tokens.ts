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
    }
  }