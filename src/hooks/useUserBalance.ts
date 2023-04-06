import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { convertNumber } from "utils/number";
import useCallContract from "hooks/useCallContract";
import { useBlockNumber } from "./useBlockNumber";
import { Contract, ethers, providers } from "ethers";
import { SupportedToken, TokenNames } from "types/tokens";

type BalanceWei = string | undefined;
type BalanceCommified = string | undefined;

type T_UserTokenBalance = {
  ETH: {
    tokenName: "ETH";
    balanceWei: BalanceWei;
    balanceCommified: BalanceCommified;
  };
  TON: {
    tokenName: "TON";
    balanceWei: BalanceWei;
    balanceCommified: BalanceCommified;
  };
  WTON: {
    tokenName: "WTON";
    balanceWei: BalanceWei;
    balanceCommified: BalanceCommified;
  };
  TOS: {
    tokenName: "TOS";
    balanceWei: BalanceWei;
    balanceCommified: BalanceCommified;
  };
  sTOS: {
    tokenName: "sTOS";
    balanceWei: BalanceWei;
    balanceCommified: BalanceCommified;
  };
  LTOS: {
    tokenName: "LTOS";
    balanceWei: BalanceWei;
    balanceCommified: BalanceCommified;
  };
};

class TokenBalance {
  erc20Contract: Contract;
  account: string;
  decimals?: number;
  balanceWei: Promise<string>;
  balanceCommified: Promise<string>;

  constructor(erc20Contract: Contract, account: string, decimals?: number) {
    this.erc20Contract = erc20Contract;
    this.account = account;
    this.decimals = decimals ?? 18;

    this.balanceWei = this.fetchBalanceWei();
    this.balanceCommified = this.fetchBalanceCommified();
  }

  private async fetchBalanceWei(): Promise<string> {
    const balanceBN = await this.erc20Contract.balanceOf(this.account);
    const balanceWei = ethers.utils.formatUnits(balanceBN, this.decimals);

    return balanceWei;
  }

  private async fetchBalanceCommified(): Promise<string> {
    const balanceBN = await this.erc20Contract.balanceOf(this.account);
    const balanceCommified =
      convertNumber({
        amount: balanceBN.toString(),
        localeString: true,
        type: this.decimals === 18 ? "wei" : "ray",
      }) ?? "-";
    return balanceCommified;
  }

  async getBalanceWei() {
    return this.balanceWei;
  }
  async getBalanceCommified() {
    return this.balanceCommified;
  }
}

const useUserBalance = () => {
  const { account, library } = useWeb3React();
  const {
    TON_CONTRACT,
    WTON_CONTRACT,
    TOS_CONTRACT,
    LockTOS_CONTRACT,
    StakingV2Proxy_CONTRACT,
  } = useCallContract();
  const { blockNumber } = useBlockNumber();

  const [userTonBalance, setUserTonBalance] = useState<string | undefined>(
    undefined
  );
  const [userWTonBalance, setUserWTonBalance] = useState<string | undefined>(
    undefined
  );
  const [userTOSBalance, setUserTOSBalance] = useState<string | undefined>(
    undefined
  );
  const [userETHBalance, setUserETHBalance] = useState<string | undefined>(
    undefined
  );
  const [userETHBalanceWei, setUserETHBalanceWei] = useState<
    number | undefined
  >(undefined);
  const [userLTOSBalance, setUserLTOSBalance] = useState<string | undefined>(
    undefined
  );
  const [userSTOSBalance, setUserSTOSBalance] = useState<string | undefined>(
    undefined
  );

  const [userTokenBalance, setUserTokenBalance] = useState<
    T_UserTokenBalance | undefined
  >(undefined);

  const tokenContractList: SupportedToken[] = useMemo(() => {
    return [
      {
        tokenName: "TON",
        decimals: 18,
        contract: TON_CONTRACT as Contract,
      },
      {
        tokenName: "WTON",
        decimals: 27,
        contract: WTON_CONTRACT as Contract,
      },
      {
        tokenName: "TOS",
        decimals: 18,
        contract: TOS_CONTRACT as Contract,
      },
      {
        tokenName: "sTOS",
        decimals: 18,
        contract: LockTOS_CONTRACT as Contract,
      },
      {
        tokenName: "LTOS",
        decimals: 18,
        contract: StakingV2Proxy_CONTRACT as Contract,
      },
    ];
  }, [
    TON_CONTRACT,
    WTON_CONTRACT,
    TOS_CONTRACT,
    LockTOS_CONTRACT,
    StakingV2Proxy_CONTRACT,
  ]);

  useEffect(() => {
    async function fetchEachTokenBalance(contract: Contract, decimals: number) {
      if (account && contract) {
        const erc20Balance = new TokenBalance(contract, account, decimals);
        const erc20BalanceWei = await erc20Balance.getBalanceWei();
        const erc20BalanceCommified = await erc20Balance.getBalanceCommified();

        return { erc20BalanceWei, erc20BalanceCommified };
      }
    }
    async function fetchTokenBalance() {
      const result = await Promise.all(
        tokenContractList.map(async (tokenInfo) => {
          if (tokenInfo.contract) {
            const tokenBalance = await fetchEachTokenBalance(
              tokenInfo.contract,
              tokenInfo.decimals
            );
            return {
              tokenName: tokenInfo.tokenName,
              balanceWei: tokenBalance?.erc20BalanceWei,
              balanceCommified: tokenBalance?.erc20BalanceCommified,
            };
          }
        })
      );
      if (result) {
        let tokenData = {};
        result.forEach((el) => {
          if (el && el?.tokenName) {
            //@ts-ignore
            tokenData[el.tokenName] = { ...el };
          }
        });

        return setUserTokenBalance(tokenData as T_UserTokenBalance);
      }
    }
    fetchTokenBalance().catch((e) => console.log(e));
  }, [blockNumber, tokenContractList, account]);

  useEffect(() => {
    async function fetchBalance() {
      if (
        !TON_CONTRACT ||
        !WTON_CONTRACT ||
        !TOS_CONTRACT ||
        !LockTOS_CONTRACT ||
        !StakingV2Proxy_CONTRACT ||
        !library
      ) {
        return;
      }
      const ton = await TON_CONTRACT.balanceOf(account);
      const wton = await WTON_CONTRACT.balanceOf(account);
      const tos = await TOS_CONTRACT.balanceOf(account);
      const eth = await library?.getBalance(account);
      const LTOS = await StakingV2Proxy_CONTRACT.balanceOf(account);
      const sTOS = await LockTOS_CONTRACT.balanceOf(account);

      const convertedTon = convertNumber({
        amount: ton.toString(),
        localeString: true,
      });
      const convertedWTon = convertNumber({
        type: "ray",
        amount: wton.toString(),
        localeString: true,
      });
      const convertedTos = convertNumber({
        amount: tos.toString(),
        localeString: true,
      });
      const convertedEth = convertNumber({
        amount: eth.toString(),
        localeString: true,
      });
      const convertedLTOS = convertNumber({
        amount: LTOS.toString(),
        localeString: true,
      });
      const convertedSTOS = convertNumber({
        amount: sTOS.toString(),
        localeString: true,
      });

      setUserTonBalance(convertedTon || "-");
      setUserWTonBalance(convertedWTon || "-");
      setUserTOSBalance(convertedTos || "-");
      setUserETHBalance(convertedEth || "-");
      setUserLTOSBalance(convertedLTOS || "-");
      setUserSTOSBalance(convertedSTOS || "-");

      const ETHBalanceWei = ethers.utils.formatUnits(eth);
      setUserETHBalanceWei(Number(ETHBalanceWei));
    }
    if (account) {
      fetchBalance().catch((e) => {
        console.log("*****fetch user balance err*****");
        console.log(e);
      });
    }
  }, [
    account,
    TON_CONTRACT,
    WTON_CONTRACT,
    TOS_CONTRACT,
    LockTOS_CONTRACT,
    StakingV2Proxy_CONTRACT,
    library,
    blockNumber,
  ]);

  return {
    userTonBalance,
    userWTonBalance,
    userTOSBalance,
    userETHBalance,
    userLTOSBalance,
    userSTOSBalance,
    userETHBalanceWei,
    userTokenBalance,
  };
};

export default useUserBalance;
