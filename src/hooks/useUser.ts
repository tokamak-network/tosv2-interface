import { useEffect, useState } from "react";
import useUserBalance from "./useUserBalance";

function useUser() {
  //   {
  //   userBalanceInfo: {
  //     TOSBalance: string;
  //     TonBalance: string;
  //     WTonBalance: string;
  //   };
  // }
  const [userBalance, setUserBalance] = useState({
    TOSBalance: "",
    TonBalance: "",
    WTonBalance: "",
  });
  const { userTOSBalance, userTonBalance, userWTonBalance } = useUserBalance();

  useEffect(() => {
    const userBalanceInfo = {
      TOSBalance: userTOSBalance,
      TonBalance: userTonBalance,
      WTonBalance: userWTonBalance,
    };
    setUserBalance(userBalanceInfo);
  }, [userTOSBalance, userTonBalance, userWTonBalance]);

  return { userBalance };
}

export default useUser;
