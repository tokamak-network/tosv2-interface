import { useEffect, useState } from "react";
import useUserBalance from "./useUserBalance";

function useUser() {
  const [userBalance, setUserBalance] = useState({});
  const { userTOSBalance, userTonBalance, userWTonBalance } = useUserBalance();

  useEffect(() => {
    const userBalanceInfo = {
      userTOSBalance,
      userTonBalance,
      userWTonBalance,
    };
    setUserBalance(userBalanceInfo);
  }, [userTOSBalance, userTonBalance, userWTonBalance]);

  return { userBalance };
}

export default useUser;
