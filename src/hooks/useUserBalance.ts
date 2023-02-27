import { useWeb3React } from "@web3-react/core";
import { useEffect, useMemo, useState } from "react";
import { convertNumber } from "utils/number";
import useCallContract from "hooks/useCallContract";
import { useBlockNumber } from "./useBlockNumber";

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
  const [userLTOSBalance, setUserLTOSBalance] = useState<string | undefined>(
    undefined
  );
  const [userSTOSBalance, setUserSTOSBalance] = useState<string | undefined>(
    undefined
  );

  const userETTBalanceNum = useMemo(() => {
    if (userETHBalance) {
      return Number(userETHBalance.replaceAll(",", ""));
    }
    return undefined;
  }, [userETHBalance]);

  useEffect(() => {
    async function fetchBalance() {
      if (
        !TON_CONTRACT ||
        !WTON_CONTRACT ||
        !TOS_CONTRACT ||
        !LockTOS_CONTRACT ||
        !StakingV2Proxy_CONTRACT
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
    userETTBalanceNum,
  };
};

export default useUserBalance;
