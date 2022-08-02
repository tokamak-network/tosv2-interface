import { useWeb3React } from "@web3-react/core";
import { useEffect, useState } from "react";
import { convertNumber } from "utils/number";
import useCallContract from "hooks/useCallContract";

const useUserBalance = () => {
  const { account } = useWeb3React();
  const { TON_CONTRACT, WTON_CONTRACT, TOS_CONTRACT } = useCallContract();

  const [userTonBalance, setUserTonBalance] = useState<string>("");
  const [userWTonBalance, setUserWTonBalance] = useState<string>("");
  const [userTOSBalance, setUserTOSBalance] = useState<string>("");

  useEffect(() => {
    async function fetchBalance() {
      try {
        if (!TON_CONTRACT || !WTON_CONTRACT || !TOS_CONTRACT) {
          return;
        }
        const ton = await TON_CONTRACT.balanceOf(account);
        const wton = await WTON_CONTRACT.balanceOf(account);
        const tos = await TOS_CONTRACT.balanceOf(account);

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

        setUserTonBalance(convertedTon || "0.00");
        setUserWTonBalance(convertedWTon || "0.00");
        setUserTOSBalance(convertedWTon || "0.00");
      } catch (e) {
        console.log("*****fetch balance err*****");
        console.log(e);
      }
    }
    if (account) {
      fetchBalance();
    }
  }, [account, TON_CONTRACT, WTON_CONTRACT, TOS_CONTRACT]);

  return { userTonBalance, userWTonBalance, userTOSBalance };
};

export default useUserBalance;
